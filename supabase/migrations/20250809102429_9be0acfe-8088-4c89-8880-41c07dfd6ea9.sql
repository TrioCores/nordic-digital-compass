-- Add timeline dates to projects table
ALTER TABLE public.projects 
ADD COLUMN start_date DATE,
ADD COLUMN estimated_launch_date DATE,
ADD COLUMN actual_launch_date DATE;

-- Add more specific phase tracking for frontend/backend
ALTER TABLE public.project_phases 
ADD COLUMN phase_type VARCHAR(50) DEFAULT 'general';

-- Update existing default phases to include frontend/backend specific phases
CREATE OR REPLACE FUNCTION public.create_default_project_phases()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.project_phases (project_id, phase_name, phase_order, status, progress, phase_type) VALUES
    (NEW.id, 'Planlægning', 1, 'completed', 100, 'general'),
    (NEW.id, 'Design', 2, 'completed', 75, 'frontend'),
    (NEW.id, 'Frontend Udvikling', 3, 'in_progress', 60, 'frontend'),
    (NEW.id, 'Backend Udvikling', 4, 'in_progress', 45, 'backend'),
    (NEW.id, 'Integration & Test', 5, 'pending', 0, 'general'),
    (NEW.id, 'Lancering', 6, 'pending', 0, 'general'),
    (NEW.id, 'Vedligeholdelse', 7, 'pending', 0, 'general');
  
  -- Create default website metrics
  INSERT INTO public.website_metrics (project_id, page_views, unique_visitors, bounce_rate, avg_session_duration) 
  VALUES (NEW.id, 1247, 892, 32.5, 3.2);
  
  RETURN NEW;
END;
$function$;

-- Create a function to update project timeline
CREATE OR REPLACE FUNCTION public.update_project_timeline(
  project_id_param UUID,
  start_date_param DATE,
  estimated_launch_date_param DATE
) 
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Check if user has admin/owner role
  IF NOT EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'owner')
  ) THEN
    RAISE EXCEPTION 'Insufficient permissions to update project timeline';
  END IF;
  
  -- Update the project timeline
  UPDATE public.projects 
  SET 
    start_date = start_date_param,
    estimated_launch_date = estimated_launch_date_param,
    updated_at = NOW()
  WHERE id = project_id_param;
  
  RETURN true;
END;
$function$;

-- Add RLS policy for new columns
-- The existing policies should cover the new columns, but let's make sure