import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  FileText, 
  Upload, 
  Edit3, 
  Eye,
  Plus,
  Search,
  Shield,
  Crown,
  BarChart3
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'user' | 'admin' | 'owner';
  created_at: string;
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

interface ProjectPhase {
  id: string;
  project_id: string;
  phase_name: string;
  phase_order: number;
  status: string;
  progress: number;
}

interface Document {
  id: string;
  name: string;
  original_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
}

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [phases, setPhases] = useState<ProjectPhase[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    initializeAdmin();
  }, []);

  const initializeAdmin = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/');
        return;
      }

      setUser(session.user);
      
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileData) {
        setProfile({...profileData, role: profileData.role as 'user' | 'admin' | 'owner'});
      }
      
      await fetchData();
    } catch (error) {
      console.error('Error initializing admin:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await Promise.all([
      fetchUsers(),
      fetchProjects(),
      fetchDocuments()
    ]);
  };

  const fetchUsers = async () => {
    try {
      const { data } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setUsers(data.map(user => ({...user, role: user.role as 'user' | 'admin' | 'owner'})));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchProjectPhases = async (projectId: string) => {
    try {
      const { data } = await supabase
        .from('project_phases')
        .select('*')
        .eq('project_id', projectId)
        .order('phase_order');

      if (data) {
        setPhases(data);
      }
    } catch (error) {
      console.error('Error fetching project phases:', error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const { data } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setDocuments(data);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const updateUserRole = async (userId: string, role: string) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ role })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Rolle opdateret",
        description: "Brugerens rolle er blevet opdateret.",
      });

      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved opdatering af rolle.",
        variant: "destructive",
      });
    }
  };

  const updatePhaseProgress = async (phaseId: string, progress: number, status: string) => {
    try {
      const { error } = await supabase
        .from('project_phases')
        .update({ progress, status })
        .eq('id', phaseId);

      if (error) throw error;

      toast({
        title: "Fase opdateret",
        description: "Projektfasens fremskridt er blevet opdateret.",
      });

      if (selectedProject) {
        fetchProjectPhases(selectedProject);
      }
    } catch (error) {
      console.error('Error updating phase:', error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved opdatering af fase.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = `admin-documents/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('admin-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          name: file.name.split('.')[0],
          original_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          uploaded_by: user.id,
        });

      if (dbError) throw dbError;

      toast({
        title: "Dokument uploadet",
        description: "Dokumentet er blevet uploadet succesfuldt.",
      });

      fetchDocuments();
      event.target.value = '';
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload fejl",
        description: "Der opstod en fejl ved upload af dokumentet.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const downloadDocument = async (document: Document) => {
    try {
      const { data, error } = await supabase.storage
        .from('admin-documents')
        .download(document.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = document.original_name;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Download fejl",
        description: "Der opstod en fejl ved download af dokumentet.",
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-500" />;
      default:
        return <Users className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
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
              <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
              <p className="text-muted-foreground">
                Administrer brugere, projekter og dokumenter
              </p>
            </div>
            <div className="flex items-center gap-2">
              {profile?.role && getRoleIcon(profile.role)}
              <Badge variant="outline">
                {profile?.role === 'owner' ? 'Ejer' : 'Administrator'}
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList>
              <TabsTrigger value="projects">Projekt Management</TabsTrigger>
              <TabsTrigger value="users">Brugere</TabsTrigger>
              <TabsTrigger value="documents">Dokumenter</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              {/* Project Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Vælg Projekt</CardTitle>
                  <CardDescription>
                    Vælg et projekt for at administrere dets fremskridt
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedProject} onValueChange={(value) => {
                    setSelectedProject(value);
                    fetchProjectPhases(value);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Vælg et projekt" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.project_name} - {project.client_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Project Phases */}
              {selectedProject && (
                <Card>
                  <CardHeader>
                    <CardTitle>Projekt Faser</CardTitle>
                    <CardDescription>
                      Opdater fremskridt og status for hver fase
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {phases.map((phase) => (
                        <div key={phase.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{phase.phase_name}</h4>
                            <Badge className={getStatusColor(phase.status)}>
                              {phase.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor={`progress-${phase.id}`}>Fremskridt (%)</Label>
                              <Input
                                id={`progress-${phase.id}`}
                                type="number"
                                min="0"
                                max="100"
                                value={phase.progress}
                                onChange={(e) => {
                                  const newProgress = parseInt(e.target.value);
                                  const newStatus = newProgress === 100 ? 'completed' : 
                                                  newProgress > 0 ? 'in_progress' : 'pending';
                                  updatePhaseProgress(phase.id, newProgress, newStatus);
                                }}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`status-${phase.id}`}>Status</Label>
                              <Select 
                                value={phase.status} 
                                onValueChange={(value) => updatePhaseProgress(phase.id, phase.progress, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Afventer</SelectItem>
                                  <SelectItem value="in_progress">I gang</SelectItem>
                                  <SelectItem value="completed">Færdig</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-end">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${phase.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Brugerhåndtering</CardTitle>
                  <CardDescription>
                    Administrer brugerroller og tilladelser
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((userData) => (
                      <div key={userData.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {getRoleIcon(userData.role)}
                            <h4 className="font-semibold">{userData.full_name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{userData.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Oprettet: {new Date(userData.created_at).toLocaleDateString('da-DK')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select 
                            value={userData.role} 
                            onValueChange={(value) => updateUserRole(userData.id, value)}
                            disabled={userData.email === 'emilmh.nw@outlook.com'}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">Bruger</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="owner">Ejer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dokumenthåndtering</CardTitle>
                  <CardDescription>
                    Upload og administrer sikre dokumenter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <Label htmlFor="file-upload" className="cursor-pointer">
                          <span className="text-sm font-medium">Klik for at uploade</span>
                          <span className="text-sm text-muted-foreground"> eller træk og slip</span>
                        </Label>
                        <Input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={handleFileUpload}
                          disabled={uploading}
                        />
                        {uploading && (
                          <p className="text-sm text-muted-foreground">Uploader...</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {(doc.file_size / 1024 / 1024).toFixed(2)} MB • 
                                {new Date(doc.created_at).toLocaleDateString('da-DK')}
                              </p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => downloadDocument(doc)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}