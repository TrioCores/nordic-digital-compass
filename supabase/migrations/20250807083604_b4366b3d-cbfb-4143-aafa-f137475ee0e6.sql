-- Fix RLS policies and create secure admin system

-- Fix documents table RLS policies  
CREATE POLICY "Admins can view all documents" 
ON public.documents 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

CREATE POLICY "Admins can insert documents" 
ON public.documents 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

CREATE POLICY "Admins can update documents" 
ON public.documents 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

CREATE POLICY "Admins can delete documents" 
ON public.documents 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

-- Add missing policies for project_updates (admin management)
CREATE POLICY "Admins can insert project updates" 
ON public.project_updates 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

CREATE POLICY "Admins can update project updates" 
ON public.project_updates 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

CREATE POLICY "Admins can delete project updates" 
ON public.project_updates 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

-- Add missing policies for project_phases (admin management)
CREATE POLICY "Admins can insert project phases" 
ON public.project_phases 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

CREATE POLICY "Admins can update project phases" 
ON public.project_phases 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

CREATE POLICY "Admins can delete project phases" 
ON public.project_phases 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

-- Add missing policies for website_metrics (admin management)
CREATE POLICY "Admins can insert website metrics" 
ON public.website_metrics 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

CREATE POLICY "Admins can update website metrics" 
ON public.website_metrics 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

CREATE POLICY "Admins can delete website metrics" 
ON public.website_metrics 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

-- Create storage bucket for documents if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('admin-documents', 'admin-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Create secure storage policies for admin documents
CREATE POLICY "Only admins can view admin documents" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'admin-documents' 
  AND EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

CREATE POLICY "Only admins can upload admin documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'admin-documents' 
  AND EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

CREATE POLICY "Only admins can update admin documents" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'admin-documents' 
  AND EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

CREATE POLICY "Only admins can delete admin documents" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'admin-documents' 
  AND EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  )
);

-- Fix function security by setting search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = 'public'
AS $function$
begin
  insert into public.user_profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    case 
      when new.email in (
        'emilmh.nw@outlook.com',
        'Mikkelwb.nw@outlook.dk'
      ) then 'owner'
      else 'user'
    end
  );
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.create_default_project_phases()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO project_phases (project_id, phase_name, phase_order, status, progress) VALUES
    (NEW.id, 'Planlægning', 1, 'completed', 100),
    (NEW.id, 'Design', 2, 'completed', 75),
    (NEW.id, 'Udvikling', 3, 'in_progress', 60),
    (NEW.id, 'Test', 4, 'pending', 0),
    (NEW.id, 'Lancering', 5, 'pending', 0),
    (NEW.id, 'Vedligeholdelse', 6, 'pending', 0);
  
  -- Create default website metrics
  INSERT INTO website_metrics (project_id, page_views, unique_visitors, bounce_rate, avg_session_duration) 
  VALUES (NEW.id, 1247, 892, 32.5, 3.2);
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$;

-- Create function to get current user role (security definer to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = 'public'
AS $function$
  SELECT role FROM user_profiles WHERE id = auth.uid();
$function$;