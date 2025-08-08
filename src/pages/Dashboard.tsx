import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Settings, 
  Plus, 
  Calendar,
  Crown,
  Shield,
  User as UserIcon,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProjectPhaseCard } from "@/components/ProjectPhaseCard";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'user' | 'admin' | 'owner';
  subscription_type?: string;
}

interface Project {
  id: string;
  project_name: string;
  client_name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalProgress: number;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectStats, setProjectStats] = useState<ProjectStats>({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalProgress: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/');
        return;
      }

      setUser(session.user);
      await fetchUserProfile(session.user.id);
      await fetchProjects(session.user.id);
    } catch (error) {
      console.error('Error initializing dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setProfile({...data, role: data.role as 'user' | 'admin' | 'owner'});
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchProjects = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_phases (
            id,
            phase_name,
            phase_order,
            status,
            progress
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (data) {
        setProjects(data);
        calculateProjectStats(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const calculateProjectStats = (projectsData: any[]) => {
    const totalProjects = projectsData.length;
    const activeProjects = projectsData.filter(p => p.status === 'in_progress').length;
    const completedProjects = projectsData.filter(p => p.status === 'completed').length;
    
    // Calculate overall progress across all projects
    let totalProgress = 0;
    if (projectsData.length > 0) {
      const projectProgresses = projectsData.map(project => {
        if (project.project_phases && project.project_phases.length > 0) {
          return project.project_phases.reduce((sum: number, phase: any) => sum + phase.progress, 0) / project.project_phases.length;
        }
        return 0;
      });
      totalProgress = projectProgresses.reduce((sum, progress) => sum + progress, 0) / projectsData.length;
    }

    setProjectStats({
      totalProjects,
      activeProjects,
      completedProjects,
      totalProgress
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'maintenance':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Færdig';
      case 'in_progress':
        return 'I gang';
      case 'maintenance':
        return 'Vedligeholdelse';
      default:
        return 'Kladde';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-500" />;
      default:
        return <UserIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Kundeportal</h1>
              <p className="text-muted-foreground">
                Velkommen tilbage, {profile?.full_name || user?.email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {profile?.role && getRoleIcon(profile.role)}
              <Badge variant="outline">
                {profile?.subscription_type || 'Basis'}
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList>
              <TabsTrigger value="projects">Mine Projekter</TabsTrigger>
              <TabsTrigger value="settings">Indstillinger</TabsTrigger>
              {(profile?.role === 'admin' || profile?.role === 'owner') && (
                <TabsTrigger value="admin">Administration</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Aktive Projekter
                    </CardTitle>
                    <Clock className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{projectStats.activeProjects}</div>
                    <p className="text-xs text-muted-foreground">
                      I gang med udvikling
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Færdige Projekter
                    </CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{projectStats.completedProjects}</div>
                    <p className="text-xs text-muted-foreground">
                      Klar til brug
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Projekter
                    </CardTitle>
                    <Globe className="h-4 w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{projectStats.totalProjects}</div>
                    <p className="text-xs text-muted-foreground">
                      Alle projekter
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Samlet Fremgang
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{Math.round(projectStats.totalProgress)}%</div>
                    <p className="text-xs text-muted-foreground">
                      Gennemsnitlig fremgang
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Projects Display */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Mine Projekter</h2>
                    <p className="text-muted-foreground">
                      Følg fremgangen på dine hjemmeside projekter
                    </p>
                  </div>
                  <Button onClick={() => navigate('/contact')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nyt Projekt
                  </Button>
                </div>

                {projects.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <Globe className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Ingen projekter endnu</h3>
                      <p className="text-muted-foreground text-center mb-6 max-w-md">
                        Få lavet din første professionelle hjemmeside hos os. 
                        Vi guiderer dig gennem hele processen fra start til slut.
                      </p>
                      <Button onClick={() => navigate('/contact')} size="lg">
                        <Plus className="h-4 w-4 mr-2" />
                        Start dit første projekt
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {projects.map((project) => (
                      <ProjectPhaseCard key={project.id} project={project} />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Kontoindstillinger</CardTitle>
                  <CardDescription>
                    Administrer dine kontooplysninger og præferencer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Profiloplysninger</h4>
                      <p className="text-sm text-muted-foreground">
                        Navn: {profile?.full_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Email: {user?.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Rolle: {profile?.role}
                      </p>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/profile')}
                    >
                      Rediger Profil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {(profile?.role === 'admin' || profile?.role === 'owner') && (
              <TabsContent value="admin">
                <Card>
                  <CardHeader>
                    <CardTitle>Administration</CardTitle>
                    <CardDescription>
                      Administrer brugere og systemindstillinger
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Admin funktioner kommer snart...
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}