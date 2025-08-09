import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  Edit3,
  Plus,
  Save,
  MessageSquare,
  TrendingUp,
  Laptop,
  Server
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  project_name: string;
  client_name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  start_date?: string;
  estimated_launch_date?: string;
  actual_launch_date?: string;
}

interface ProjectPhase {
  id: string;
  project_id: string;
  phase_name: string;
  phase_order: number;
  status: string;
  progress: number;
  phase_type?: string;
}

interface ProjectUpdate {
  id: string;
  project_id: string;
  title: string;
  description: string;
  created_at: string;
  created_by: string;
}

interface AdminProjectManagementProps {
  projects: Project[];
  onProjectsUpdate: () => void;
}

export const AdminProjectManagement = ({ projects, onProjectsUpdate }: AdminProjectManagementProps) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [phases, setPhases] = useState<ProjectPhase[]>([]);
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [editingPhase, setEditingPhase] = useState<string | null>(null);
  const [phaseProgress, setPhaseProgress] = useState<{ [key: string]: number }>({});
  const [phaseStatus, setPhaseStatus] = useState<{ [key: string]: string }>({});
  const [newUpdate, setNewUpdate] = useState({ title: "", description: "" });
  const [timelineData, setTimelineData] = useState({
    start_date: "",
    estimated_launch_date: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    if (selectedProjectId) {
      const project = projects.find(p => p.id === selectedProjectId);
      setSelectedProject(project || null);
      if (project) {
        fetchProjectData(selectedProjectId);
        setTimelineData({
          start_date: project.start_date ? project.start_date.split('T')[0] : "",
          estimated_launch_date: project.estimated_launch_date ? project.estimated_launch_date.split('T')[0] : ""
        });
      }
    }
  }, [selectedProjectId, projects]);

  const fetchProjectData = async (projectId: string) => {
    try {
      const [phasesData, updatesData] = await Promise.all([
        supabase
          .from('project_phases')
          .select('*')
          .eq('project_id', projectId)
          .order('phase_order'),
        supabase
          .from('project_updates')
          .select('*')
          .eq('project_id', projectId)
          .order('created_at', { ascending: false })
      ]);

      if (phasesData.data) {
        setPhases(phasesData.data);
        const progressMap: { [key: string]: number } = {};
        const statusMap: { [key: string]: string } = {};
        phasesData.data.forEach(phase => {
          progressMap[phase.id] = phase.progress;
          statusMap[phase.id] = phase.status;
        });
        setPhaseProgress(progressMap);
        setPhaseStatus(statusMap);
      }
      if (updatesData.data) setUpdates(updatesData.data);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  const updatePhaseProgress = async (phaseId: string) => {
    try {
      const progress = phaseProgress[phaseId];
      const status = phaseStatus[phaseId];

      const { error } = await supabase
        .from('project_phases')
        .update({ progress, status })
        .eq('id', phaseId);

      if (error) throw error;

      toast({
        title: "Fase opdateret",
        description: "Projektfasens fremskridt er blevet opdateret.",
      });

      setEditingPhase(null);
      fetchProjectData(selectedProjectId);
    } catch (error) {
      console.error('Error updating phase:', error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved opdatering af fase.",
        variant: "destructive",
      });
    }
  };

  const updateProjectTimeline = async () => {
    if (!selectedProjectId) return;

    try {
      const { error } = await supabase.rpc('update_project_timeline', {
        project_id_param: selectedProjectId,
        start_date_param: timelineData.start_date || null,
        estimated_launch_date_param: timelineData.estimated_launch_date || null
      });

      if (error) throw error;

      toast({
        title: "Tidsplan opdateret",
        description: "Projektets tidsplan er blevet opdateret.",
      });

      onProjectsUpdate();
    } catch (error) {
      console.error('Error updating timeline:', error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved opdatering af tidsplan.",
        variant: "destructive",
      });
    }
  };

  const addProjectUpdate = async () => {
    if (!selectedProjectId || !newUpdate.title.trim()) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { error } = await supabase
        .from('project_updates')
        .insert({
          project_id: selectedProjectId,
          title: newUpdate.title,
          description: newUpdate.description,
          created_by: session.user.id
        });

      if (error) throw error;

      toast({
        title: "Opdatering tilføjet",
        description: "Projektopdateringen er blevet tilføjet.",
      });

      setNewUpdate({ title: "", description: "" });
      fetchProjectData(selectedProjectId);
    } catch (error) {
      console.error('Error adding update:', error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved tilføjelse af opdatering.",
        variant: "destructive",
      });
    }
  };

  const getFrontendProgress = () => {
    const frontendPhases = phases.filter(p => p.phase_type === 'frontend');
    if (frontendPhases.length === 0) return 0;
    return Math.round(frontendPhases.reduce((sum, phase) => sum + phase.progress, 0) / frontendPhases.length);
  };

  const getBackendProgress = () => {
    const backendPhases = phases.filter(p => p.phase_type === 'backend');
    if (backendPhases.length === 0) return 0;
    return Math.round(backendPhases.reduce((sum, phase) => sum + phase.progress, 0) / backendPhases.length);
  };

  const getOverallProgress = () => {
    if (phases.length === 0) return 0;
    return Math.round(phases.reduce((sum, phase) => sum + phase.progress, 0) / phases.length);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Projekt Administration
          </CardTitle>
          <CardDescription>
            Administrer projektfremgang, tidsplaner og opdateringer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Vælg projekt</Label>
              <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                <SelectTrigger>
                  <SelectValue placeholder="Vælg et projekt..." />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.project_name} - {project.client_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedProject && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{getOverallProgress()}%</div>
                  <p className="text-xs text-muted-foreground">Samlet fremgang</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{getFrontendProgress()}%</div>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Laptop className="h-3 w-3" />
                    Frontend
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{getBackendProgress()}%</div>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Server className="h-3 w-3" />
                    Backend
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedProject && (
        <Tabs defaultValue="phases" className="space-y-6">
          <TabsList>
            <TabsTrigger value="phases">Projektfaser</TabsTrigger>
            <TabsTrigger value="timeline">Tidsplan</TabsTrigger>
            <TabsTrigger value="updates">Opdateringer</TabsTrigger>
          </TabsList>

          <TabsContent value="phases">
            <Card>
              <CardHeader>
                <CardTitle>Projektfaser</CardTitle>
                <CardDescription>
                  Administrer fremgang for hver projektfase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {phases.map((phase) => (
                    <div key={phase.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{phase.phase_name}</h4>
                          {phase.phase_type && (
                            <Badge variant="outline" className="text-xs">
                              {phase.phase_type === 'frontend' ? '🖥️ Frontend' : 
                               phase.phase_type === 'backend' ? '⚙️ Backend' : '📋 Generel'}
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingPhase(editingPhase === phase.id ? null : phase.id)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>

                      {editingPhase === phase.id ? (
                        <div className="space-y-3">
                          <div>
                            <Label>Fremgang (%)</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={phaseProgress[phase.id] || 0}
                              onChange={(e) => 
                                setPhaseProgress(prev => ({
                                  ...prev,
                                  [phase.id]: parseInt(e.target.value) || 0
                                }))
                              }
                            />
                          </div>
                          <div>
                            <Label>Status</Label>
                            <Select
                              value={phaseStatus[phase.id] || phase.status}
                              onValueChange={(value) => 
                                setPhaseStatus(prev => ({
                                  ...prev,
                                  [phase.id]: value
                                }))
                              }
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
                          <div className="flex gap-2">
                            <Button onClick={() => updatePhaseProgress(phase.id)}>
                              <Save className="h-4 w-4 mr-2" />
                              Gem
                            </Button>
                            <Button variant="outline" onClick={() => setEditingPhase(null)}>
                              Annuller
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              Status: {phase.status === 'completed' ? 'Færdig' : 
                                      phase.status === 'in_progress' ? 'I gang' : 'Afventer'}
                            </span>
                            <span className="text-sm font-medium">{phase.progress}%</span>
                          </div>
                          <Progress value={phase.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Projekt Tidsplan
                </CardTitle>
                <CardDescription>
                  Administrer projektets start- og lanceringsdatoer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Startdato</Label>
                    <Input
                      type="date"
                      value={timelineData.start_date}
                      onChange={(e) => 
                        setTimelineData(prev => ({ ...prev, start_date: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Forventet lanceringsdato</Label>
                    <Input
                      type="date"
                      value={timelineData.estimated_launch_date}
                      onChange={(e) => 
                        setTimelineData(prev => ({ ...prev, estimated_launch_date: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <Button onClick={updateProjectTimeline} className="mt-4">
                  <Save className="h-4 w-4 mr-2" />
                  Gem tidsplan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="updates">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Tilføj opdatering
                  </CardTitle>
                  <CardDescription>
                    Tilføj en ny opdatering til projektet som kunden kan se
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Titel</Label>
                      <Input
                        value={newUpdate.title}
                        onChange={(e) => setNewUpdate(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="F.eks. 'Design godkendt og udvikling påbegyndt'"
                      />
                    </div>
                    <div>
                      <Label>Beskrivelse</Label>
                      <Textarea
                        value={newUpdate.description}
                        onChange={(e) => setNewUpdate(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Uddyb hvad der er sket i denne opdatering..."
                      />
                    </div>
                    <Button onClick={addProjectUpdate} disabled={!newUpdate.title.trim()}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Tilføj opdatering
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Eksisterende opdateringer</CardTitle>
                  <CardDescription>
                    Tidligere opdateringer til dette projekt
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {updates.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        Ingen opdateringer endnu
                      </p>
                    ) : (
                      updates.map((update) => (
                        <div key={update.id} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{update.title}</h4>
                            <span className="text-xs text-muted-foreground">
                              {new Date(update.created_at).toLocaleDateString('da-DK')}
                            </span>
                          </div>
                          {update.description && (
                            <p className="text-sm text-muted-foreground">{update.description}</p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};