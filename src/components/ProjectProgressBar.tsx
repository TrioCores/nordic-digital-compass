import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, CircleDot } from "lucide-react";

interface ProjectPhase {
  id: string;
  phase_name: string;
  phase_order: number;
  status: 'pending' | 'in_progress' | 'completed';
  progress: number;
}

interface ProjectProgressBarProps {
  phases: ProjectPhase[];
}

export const ProjectProgressBar = ({ phases }: ProjectProgressBarProps) => {
  const sortedPhases = phases.sort((a, b) => a.phase_order - b.phase_order);
  const totalProgress = phases.reduce((sum, phase) => sum + phase.progress, 0) / phases.length;

  const getPhaseIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <CircleDot className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Færdig';
      case 'in_progress':
        return 'I gang';
      default:
        return 'Afventer';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-blue-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Samlet fremgang</span>
          <span className="text-sm text-muted-foreground">{Math.round(totalProgress)}%</span>
        </div>
        <Progress value={totalProgress} className="h-2" />
      </div>

      {/* Phase Details */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Projekt faser</h4>
        <div className="space-y-2">
          {sortedPhases.map((phase, index) => (
            <div
              key={phase.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6">
                  {getPhaseIcon(phase.status)}
                </div>
                <div>
                  <p className="text-sm font-medium">{phase.phase_name}</p>
                  <p className={`text-xs ${getStatusColor(phase.status)}`}>
                    {getStatusText(phase.status)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{phase.progress}%</p>
                <Progress value={phase.progress} className="h-1 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};