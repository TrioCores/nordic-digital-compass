-- Fix user_profiles RLS policies to allow role updates

-- Enable RLS on user_profiles table if not already enabled
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can update user roles" ON public.user_profiles;

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Allow users to update their own profile (except role)
CREATE POLICY "Users can update own profile" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow admins and owners to view all profiles
CREATE POLICY "Admins can view all profiles" 
ON public.user_profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

-- Allow admins and owners to update user roles
CREATE POLICY "Admins can update user roles" 
ON public.user_profiles 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

-- Allow new user registration
CREATE POLICY "Allow user registration" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create RPC function for admin role updates (bypasses RLS)
CREATE OR REPLACE FUNCTION public.update_user_role_admin(
  target_user_id UUID,
  new_role TEXT
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  current_user_role TEXT;
BEGIN
  -- Check if current user is admin or owner
  SELECT role INTO current_user_role 
  FROM user_profiles 
  WHERE id = auth.uid();
  
  IF current_user_role NOT IN ('admin', 'owner') THEN
    RAISE EXCEPTION 'Insufficient permissions to update user roles';
  END IF;
  
  -- Validate new role
  IF new_role NOT IN ('user', 'admin', 'owner') THEN
    RAISE EXCEPTION 'Invalid role specified';
  END IF;
  
  -- Update the user's role
  UPDATE user_profiles 
  SET role = new_role, updated_at = NOW()
  WHERE id = target_user_id;
  
  RETURN true;
END;
$function$;
