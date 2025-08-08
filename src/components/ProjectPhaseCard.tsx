import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Eye, 
  Calendar, 
  Clock,
  CheckCircle,
  CircleDot,
  MessageCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProjectProgressBar } from "./ProjectProgressBar";

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
  phase_name: string;
  phase_order: number;
  status: 'pending' | 'in_progress' | 'completed';
  progress: number;
}

interface ProjectUpdate {
  id: string;
  title: string;
  description: string;
  created_at: string;
  created_by: string;
}

interface WebsiteMetrics {
  page_views: number;
  unique_visitors: number;
  bounce_rate: number;
  avg_session_duration: number;
}

interface ProjectPhaseCardProps {
  project: Project;
}

export const ProjectPhaseCard = ({ project }: ProjectPhaseCardProps) => {
  const [phases, setPhases] = useState<ProjectPhase[]>([]);
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [metrics, setMetrics] = useState<WebsiteMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectData();
  }, [project.id]);

  const fetchProjectData = async () => {
    try {
      const [phasesData, updatesData, metricsData] = await Promise.all([
        supabase
          .from('project_phases')
          .select('*')
          .eq('project_id', project.id)
          .order('phase_order'),
        supabase
          .from('project_updates')
          .select('*')
          .eq('project_id', project.id)
          .order('created_at', { ascending: false })
          .limit(3),
        supabase
          .from('website_metrics')
          .select('*')
          .eq('project_id', project.id)
          .single()
      ]);

      if (phasesData.data) setPhases(phasesData.data.map(phase => ({
        ...phase,
        status: phase.status as 'pending' | 'in_progress' | 'completed'
      })));
      if (updatesData.data) setUpdates(updatesData.data);
      if (metricsData.data) setMetrics(metricsData.data);
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setLoading(false);
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
        return 'bg-muted';
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

  const totalProgress = phases.length > 0 
    ? phases.reduce((sum, phase) => sum + phase.progress, 0) / phases.length 
    : 0;

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-2 bg-muted rounded"></div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded"></div>
              <div className="h-3 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{project.project_name}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`${getStatusColor(project.status)} text-white`}
            >
              {getStatusText(project.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Samlet fremgang</span>
            <span className="text-sm text-muted-foreground">{Math.round(totalProgress)}%</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>

        {/* Quick Phase Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
            <p className="text-sm font-medium">Færdige faser</p>
            <p className="text-xs text-muted-foreground">
              {phases.filter(p => p.status === 'completed').length} af {phases.length}
            </p>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
            <p className="text-sm font-medium">Nuværende fase</p>
            <p className="text-xs text-muted-foreground">
              {phases.find(p => p.status === 'in_progress')?.phase_name || 'Ingen aktive'}
            </p>
          </div>
        </div>

        {/* Latest Update */}
        {updates.length > 0 && (
          <div className="p-3 rounded-lg border bg-card/50">
            <div className="flex items-start gap-2">
              <MessageCircle className="h-4 w-4 text-blue-500 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{updates[0].title}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(updates[0].created_at).toLocaleDateString('da-DK')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                <Eye className="h-4 w-4 mr-2" />
                Se detaljer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{project.project_name}</DialogTitle>
                <DialogDescription>Detaljeret projektfremgang og statistikker</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Project Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Oprettet:</span>
                    <p className="text-muted-foreground">
                      {new Date(project.created_at).toLocaleDateString('da-DK')}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Senest opdateret:</span>
                    <p className="text-muted-foreground">
                      {new Date(project.updated_at).toLocaleDateString('da-DK')}
                    </p>
                  </div>
                </div>

                {/* Detailed Progress */}
                <ProjectProgressBar phases={phases} />

                {/* Website Metrics */}
                {metrics && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Hjemmeside statistikker</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg border text-center">
                        <p className="text-2xl font-bold text-blue-600">{metrics.page_views.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Sidevisninger</p>
                      </div>
                      <div className="p-3 rounded-lg border text-center">
                        <p className="text-2xl font-bold text-green-600">{metrics.unique_visitors.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Unikke besøgende</p>
                      </div>
                      <div className="p-3 rounded-lg border text-center">
                        <p className="text-2xl font-bold text-yellow-600">{metrics.bounce_rate}%</p>
                        <p className="text-xs text-muted-foreground">Bounce rate</p>
                      </div>
                      <div className="p-3 rounded-lg border text-center">
                        <p className="text-2xl font-bold text-purple-600">{metrics.avg_session_duration}m</p>
                        <p className="text-xs text-muted-foreground">Ø. besøgstid</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Updates */}
                {updates.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Seneste opdateringer</h4>
                    <div className="space-y-2">
                      {updates.map((update) => (
                        <div key={update.id} className="p-3 rounded-lg border">
                          <h5 className="text-sm font-medium">{update.title}</h5>
                          <p className="text-xs text-muted-foreground mt-1">
                            {update.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(update.created_at).toLocaleDateString('da-DK')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {project.status === 'completed' && (
            <Button variant="default" className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              Besøg side
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};