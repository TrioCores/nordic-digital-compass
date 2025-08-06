-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  client_name VARCHAR(255) NOT NULL,
  project_name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_phases table
CREATE TABLE IF NOT EXISTS project_phases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  phase_name VARCHAR(100) NOT NULL,
  phase_order INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, in-progress, completed, delayed
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_updates table
CREATE TABLE IF NOT EXISTS project_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create website_metrics table
CREATE TABLE IF NOT EXISTS website_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  avg_session_duration DECIMAL(5,2) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for projects
CREATE POLICY "Users can view their own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all projects" ON projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can insert projects" ON projects
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can update projects" ON projects
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'owner')
    )
  );

-- Create policies for project_phases
CREATE POLICY "Users can view phases of their projects" ON project_phases
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_phases.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all project phases" ON project_phases
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can manage project phases" ON project_phases
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'owner')
    )
  );

-- Create policies for project_updates
CREATE POLICY "Users can view updates for their projects" ON project_updates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_updates.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all project updates" ON project_updates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can manage project updates" ON project_updates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'owner')
    )
  );

-- Create policies for website_metrics
CREATE POLICY "Users can view metrics for their projects" ON website_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = website_metrics.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all website metrics" ON website_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can manage website metrics" ON website_metrics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'owner')
    )
  );

-- Insert default project phases
INSERT INTO project_phases (project_id, phase_name, phase_order, status, progress) 
SELECT 
  p.id,
  phase_info.name,
  phase_info.order_num,
  CASE 
    WHEN phase_info.order_num = 1 THEN 'completed'
    WHEN phase_info.order_num = 2 THEN 'completed' 
    WHEN phase_info.order_num = 3 THEN 'in-progress'
    ELSE 'pending'
  END,
  CASE 
    WHEN phase_info.order_num = 1 THEN 100
    WHEN phase_info.order_num = 2 THEN 75
    WHEN phase_info.order_num = 3 THEN 60
    ELSE 0
  END
FROM projects p
CROSS JOIN (
  VALUES 
    ('Planlægning', 1),
    ('Design', 2),
    ('Udvikling', 3),
    ('Test', 4),
    ('Lancering', 5),
    ('Vedligeholdelse', 6)
) AS phase_info(name, order_num)
WHERE NOT EXISTS (
  SELECT 1 FROM project_phases 
  WHERE project_phases.project_id = p.id
);

-- Create function to automatically create project phases when a new project is created
CREATE OR REPLACE FUNCTION create_default_project_phases()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO project_phases (project_id, phase_name, phase_order, status, progress) VALUES
    (NEW.id, 'Planlægning', 1, 'completed', 100),
    (NEW.id, 'Design', 2, 'completed', 75),
    (NEW.id, 'Udvikling', 3, 'in-progress', 60),
    (NEW.id, 'Test', 4, 'pending', 0),
    (NEW.id, 'Lancering', 5, 'pending', 0),
    (NEW.id, 'Vedligeholdelse', 6, 'pending', 0);
  
  -- Create default website metrics
  INSERT INTO website_metrics (project_id, page_views, unique_visitors, bounce_rate, avg_session_duration) 
  VALUES (NEW.id, 1247, 892, 32.5, 3.2);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER trigger_create_default_project_phases
  AFTER INSERT ON projects
  FOR EACH ROW
  EXECUTE FUNCTION create_default_project_phases();

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_phases_updated_at BEFORE UPDATE ON project_phases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_metrics_updated_at BEFORE UPDATE ON website_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
