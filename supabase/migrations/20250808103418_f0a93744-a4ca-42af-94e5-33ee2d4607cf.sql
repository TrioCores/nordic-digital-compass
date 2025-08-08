-- Fix remaining security linter warnings

-- Fix search_path for create_default_project_phases function
CREATE OR REPLACE FUNCTION public.create_default_project_phases()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.project_phases (project_id, phase_name, phase_order, status, progress) VALUES
    (NEW.id, 'Planlægning', 1, 'completed', 100),
    (NEW.id, 'Design', 2, 'completed', 75),
    (NEW.id, 'Udvikling', 3, 'in_progress', 60),
    (NEW.id, 'Test', 4, 'pending', 0),
    (NEW.id, 'Lancering', 5, 'pending', 0),
    (NEW.id, 'Vedligeholdelse', 6, 'pending', 0);
  
  -- Create default website metrics
  INSERT INTO public.website_metrics (project_id, page_views, unique_visitors, bounce_rate, avg_session_duration) 
  VALUES (NEW.id, 1247, 892, 32.5, 3.2);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix search_path for handle_updated_at function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;