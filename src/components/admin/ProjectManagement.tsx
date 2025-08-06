import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useProjects, useProjectPhases, useProjectUpdates, useWebsiteMetrics } from '@/hooks/useProjects'
import { 
  FolderOpen, 
  Plus, 
  Save, 
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar
} from 'lucide-react'

const ProjectManagement = () => {
  const { projects, loading: projectsLoading, fetchProjects, error: projectsError, createProject } = useProjects()
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [newUpdateTitle, setNewUpdateTitle] = useState('')
  const [newUpdateDescription, setNewUpdateDescription] = useState('')
  
  const { toast } = useToast()
  
  // Debug information
  console.log('Debug ProjectManagement:', { 
    projectsCount: projects.length, 
    loading: projectsLoading, 
    error: projectsError,
    projects: projects 
  })
  
  // Hooks for selected project
  const { phases, updatePhase } = useProjectPhases(selectedProjectId)
  const { updates, addUpdate } = useProjectUpdates(selectedProjectId)
  const { metrics, updateMetrics } = useWebsiteMetrics(selectedProjectId)

  // Select first project by default
  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id)
    }
  }, [projects, selectedProjectId])

  const createTestProject = async () => {
    try {
      await createProject({
        user_id: 'CURRENT_USER', // Will be replaced by actual user in hook
        client_name: 'Test Kunde A/S',
        project_name: 'Ny Hjemmeside',
        description: 'Test projekt oprettet fra admin panel',
        status: 'active'
      })
      toast({
        title: "Succes",
        description: "Test projekt oprettet",
      })
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke oprette test projekt",
        variant: "destructive",
      })
    }
  }

  const handlePhaseUpdate = async (phaseId: string, field: string, value: any) => {
    try {
      await updatePhase(phaseId, { [field]: value })
      toast({
        title: "Succes",
        description: "Projekt fase opdateret",
      })
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke opdatere projekt fase",
        variant: "destructive",
      })
    }
  }

  const handleAddUpdate = async () => {
    if (!newUpdateTitle.trim()) return
    
    try {
      await addUpdate(newUpdateTitle, newUpdateDescription)
      setNewUpdateTitle('')
      setNewUpdateDescription('')
      toast({
        title: "Succes",
        description: "Opdatering tilføjet",
      })
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke tilføje opdatering",
        variant: "destructive",
      })
    }
  }

  const handleMetricsUpdate = async (field: string, value: number) => {
    try {
      await updateMetrics({ [field]: value })
      toast({
        title: "Succes",
        description: "Metrics opdateret",
      })
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke opdatere metrics",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-500" size={20} />
      case 'in-progress': return <Clock className="text-blue-500" size={20} />
      case 'delayed': return <AlertCircle className="text-red-500" size={20} />
      default: return <Clock className="text-gray-400" size={20} />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-800">Færdig</Badge>
      case 'in-progress': return <Badge className="bg-blue-100 text-blue-800">I gang</Badge>
      case 'delayed': return <Badge variant="destructive">Forsinket</Badge>
      default: return <Badge variant="outline">Afventer</Badge>
    }
  }

  if (projectsLoading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <RefreshCw className="animate-spin mx-auto mb-4" size={32} />
          <p>Henter projekter...</p>
        </CardContent>
      </Card>
    )
  }

  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <FolderOpen className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-500 mb-4">Ingen projekter fundet</p>
          {projectsError && (
            <p className="text-red-500 text-sm mb-4">Fejl: {projectsError}</p>
          )}
          <div className="flex gap-2 justify-center">
            <Button onClick={fetchProjects}>
              <RefreshCw size={16} className="mr-2" />
              Opdater
            </Button>
            <Button onClick={createTestProject} variant="outline">
              <Plus size={16} className="mr-2" />
              Opret Test Projekt
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const selectedProject = projects.find(p => p.id === selectedProjectId)

  return (
    <div className="space-y-6">
      {/* Project Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen size={20} />
            Vælg Projekt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Vælg et projekt" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.client_name} - {project.project_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedProject && (
        <>
          {/* Project Phases */}
          <Card>
            <CardHeader>
              <CardTitle>Projekt Faser - {selectedProject.client_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phases.map((phase) => (
                  <div key={phase.id} className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(phase.status)}
                        <h4 className="font-medium">{phase.phase_name}</h4>
                      </div>
                      {getStatusBadge(phase.status)}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm">Status</Label>
                      <Select 
                        value={phase.status} 
                        onValueChange={(value) => handlePhaseUpdate(phase.id, 'status', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Afventer</SelectItem>
                          <SelectItem value="in-progress">I gang</SelectItem>
                          <SelectItem value="completed">Færdig</SelectItem>
                          <SelectItem value="delayed">Forsinket</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Fremgang: {phase.progress}%</Label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={phase.progress}
                        onChange={(e) => handlePhaseUpdate(phase.id, 'progress', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} />
                Projekt Opdateringer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add new update */}
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium">Tilføj ny opdatering</h4>
                <div className="space-y-2">
                  <Label>Titel</Label>
                  <Input 
                    value={newUpdateTitle}
                    onChange={(e) => setNewUpdateTitle(e.target.value)}
                    placeholder="Titel på opdatering"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Beskrivelse</Label>
                  <Textarea 
                    value={newUpdateDescription}
                    onChange={(e) => setNewUpdateDescription(e.target.value)}
                    placeholder="Beskrivelse af opdateringen"
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddUpdate} disabled={!newUpdateTitle.trim()}>
                  <Plus size={16} className="mr-2" />
                  Tilføj Opdatering
                </Button>
              </div>

              {/* Recent updates list */}
              <div className="space-y-3">
                <h4 className="font-medium">Seneste opdateringer</h4>
                {updates.length === 0 ? (
                  <p className="text-gray-500 text-sm">Ingen opdateringer endnu</p>
                ) : (
                  <div className="space-y-2">
                    {updates.slice(0, 5).map((update) => (
                      <div key={update.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{update.title}</h5>
                            {update.description && (
                              <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(update.created_at).toLocaleDateString('da-DK')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Website Metrics */}
          {metrics && (
            <Card>
              <CardHeader>
                <CardTitle>Website Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Page Views</Label>
                    <Input 
                      type="number" 
                      value={metrics.page_views}
                      onChange={(e) => handleMetricsUpdate('page_views', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Unique Visitors</Label>
                    <Input 
                      type="number" 
                      value={metrics.unique_visitors}
                      onChange={(e) => handleMetricsUpdate('unique_visitors', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bounce Rate (%)</Label>
                    <Input 
                      type="number" 
                      step="0.1"
                      value={metrics.bounce_rate}
                      onChange={(e) => handleMetricsUpdate('bounce_rate', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Avg Session (min)</Label>
                    <Input 
                      type="number" 
                      step="0.1"
                      value={metrics.avg_session_duration}
                      onChange={(e) => handleMetricsUpdate('avg_session_duration', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}

export default ProjectManagement
