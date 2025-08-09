-- CRITICAL SECURITY FIXES

-- 1. Enable RLS on user_profiles table (CRITICAL - was missing!)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 2. Create security definer function to avoid infinite recursion in RLS
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.user_profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- 3. Drop existing potentially problematic policies and recreate them properly
DROP POLICY IF EXISTS "Users can manage own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Authenticated users can read profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users during signup" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can update user roles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow user registration" ON public.user_profiles;

-- 4. Create secure RLS policies for user_profiles
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile (but not their role)
CREATE POLICY "Users can update own profile" ON public.user_profiles
FOR UPDATE USING (auth.uid() = id)
WITH CHECK (auth.uid() = id AND role = (SELECT role FROM public.user_profiles WHERE id = auth.uid()));

-- Users can insert their own profile during signup
CREATE POLICY "Users can insert own profile" ON public.user_profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- Admins can view all profiles using security definer function
CREATE POLICY "Admins can view all profiles" ON public.user_profiles
FOR SELECT USING (public.get_current_user_role() IN ('admin', 'owner'));

-- Only owners can update user roles (prevent privilege escalation)
CREATE POLICY "Owners can update user roles" ON public.user_profiles
FOR UPDATE USING (public.get_current_user_role() = 'owner')
WITH CHECK (public.get_current_user_role() = 'owner');

-- 5. Fix search_path in existing functions for security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.update_user_role_admin(target_user_id uuid, new_role text)
RETURNS boolean AS $$
DECLARE
  current_user_role TEXT;
BEGIN
  -- Use security definer function to get role
  SELECT public.get_current_user_role() INTO current_user_role;
  
  IF current_user_role NOT IN ('admin', 'owner') THEN
    RAISE EXCEPTION 'Insufficient permissions to update user roles';
  END IF;
  
  -- Prevent users from changing their own role (prevent lockout)
  IF target_user_id = auth.uid() THEN
    RAISE EXCEPTION 'Cannot change your own role';
  END IF;
  
  -- Validate new role
  IF new_role NOT IN ('user', 'admin', 'owner') THEN
    RAISE EXCEPTION 'Invalid role specified';
  END IF;
  
  -- Only owners can create other owners
  IF new_role = 'owner' AND current_user_role != 'owner' THEN
    RAISE EXCEPTION 'Only owners can assign owner role';
  END IF;
  
  -- Update the user's role
  UPDATE public.user_profiles 
  SET role = new_role, updated_at = NOW()
  WHERE id = target_user_id;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 6. Update handle_new_user function to be more secure
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    CASE 
      WHEN NEW.email IN (
        'emilmh.nw@outlook.dk',
        'Mikkelwb.nw@outlook.dk'
      ) THEN 'owner'
      ELSE 'user'
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 7. Create audit logging for role changes
CREATE TABLE IF NOT EXISTS public.user_role_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_user_id UUID NOT NULL,
  old_role TEXT,
  new_role TEXT,
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.user_role_audit ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" ON public.user_role_audit
FOR SELECT USING (public.get_current_user_role() IN ('admin', 'owner'));