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
  Eye, 
  Edit3, 
  Calendar,
  Crown,
  Shield,
  User as UserIcon
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
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
      console.error('Error checking user:', error);
      navigate('/');
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
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (data) {
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
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
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Aktive Projekter
                    </CardTitle>
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {projects.filter(p => p.status === 'in_progress').length}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Færdige Projekter
                    </CardTitle>
                    <Settings className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {projects.filter(p => p.status === 'completed').length}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Projekter
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{projects.length}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Projects List */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Mine Projekter</CardTitle>
                      <CardDescription>
                        Administrer og se status på dine hjemmesider
                      </CardDescription>
                    </div>
                    <Button onClick={() => navigate('/contact')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Nyt Projekt
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {projects.length === 0 ? (
                    <div className="text-center py-8">
                      <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Ingen projekter endnu</h3>
                      <p className="text-muted-foreground mb-4">
                        Få lavet din første hjemmeside hos os
                      </p>
                      <Button onClick={() => navigate('/contact')}>
                        Start dit første projekt
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="space-y-1">
                            <h4 className="font-semibold">{project.project_name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {project.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={`${getStatusColor(project.status)} text-white`}
                              >
                                {getStatusText(project.status)}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Oprettet {new Date(project.created_at).toLocaleDateString('da-DK')}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Se
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit3 className="h-4 w-4 mr-2" />
                              Rediger
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
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
                    <Button variant="outline">
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