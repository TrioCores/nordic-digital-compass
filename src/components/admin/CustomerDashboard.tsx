import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useProjects, useProjectPhases, useProjectUpdates, useWebsiteMetrics } from '@/hooks/useProjects'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  Globe, 
  LogOut, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Home,
  BarChart3,
  Settings,
  FileText,
  Users,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'

interface ProjectStatus {
  phase: string
  progress: number
  status: 'completed' | 'in-progress' | 'pending' | 'delayed'
  estimatedCompletion: string
}

const CustomerDashboard = () => {
  const { user, signOut, isAdmin } = useAuth()
  const { projects, loading: projectsLoading, error: projectsError } = useProjects()
  
  // Debug information
  console.log('Debug CustomerDashboard:', { 
    user: user?.email, 
    projectsCount: projects.length, 
    loading: projectsLoading, 
    error: projectsError 
  })
  
  // Use first project for now (in real app, user would select or have assigned project)
  const currentProject = projects[0]
  const projectId = currentProject?.id || ''
  
  const { phases, loading: phasesLoading } = useProjectPhases(projectId)
  const { updates, loading: updatesLoading } = useProjectUpdates(projectId)
  const { metrics, loading: metricsLoading } = useWebsiteMetrics(projectId)

  // Show loading state
  if (projectsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Henter projekter...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (projectsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Fejl: {projectsError}</p>
          <p className="text-gray-600">Kunne ikke hente projekter fra databasen.</p>
        </div>
      </div>
    )
  }

  // Show no projects state
  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Ingen projekter fundet.</p>
          <p className="text-sm text-gray-500">Kontakt administrator for at få tildelt et projekt.</p>
        </div>
      </div>
    )
  }

  // Fallback to mock data if no real data is available
  const mockProjectData = {
    projectName: currentProject?.project_name || "Nordweb Hjemmeside",
    clientName: currentProject?.client_name || user?.email?.split('@')[0] || "Kunde",
    startDate: "2025-01-15",
    estimatedLaunch: "2025-09-15",
    currentPhase: "Design & Udvikling",
    overallProgress: 65,
    phases: [
      {
        name: "Projektstart & Planlægning",
        progress: 100,
        status: "completed" as const,
        estimatedCompletion: "2025-01-20"
      },
      {
        name: "Design & Wireframes", 
        progress: 100,
        status: "completed" as const,
        estimatedCompletion: "2025-02-05"
      },
      {
        name: "Udvikling & Programmering",
        progress: 80,
        status: "in-progress" as const,
        estimatedCompletion: "2025-02-20"
      },
      {
        name: "Test & Optimering",
        progress: 0,
        status: "pending" as const,
        estimatedCompletion: "2025-02-25"
      },
      {
        name: "Launch & Go-live",
        progress: 0,
        status: "pending" as const,
        estimatedCompletion: "2025-02-28"
      }
    ],
    recentUpdates: [
      {
        date: "2025-08-06",
        title: "Responsivt design implementeret",
        description: "Hjemmesiden er nu optimeret til mobile enheder"
      },
      {
        date: "2025-08-05", 
        title: "Admin panel tilføjet",
        description: "Kunde dashboard og document management system færdigt"
      },
      {
        date: "2025-08-04",
        title: "Database struktur færdig",
        description: "Alle backend systemer er nu på plads"
      }
    ],
    metrics: {
      pageViews: 1247,
      uniqueVisitors: 892,
      bounceRate: 32,
      avgSessionTime: "2:34"
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const navigateToMain = () => {
    window.location.href = '/'
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Globe className="text-primary" size={28} />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Mit Projekt</h1>
                <p className="text-sm text-gray-500">Nordweb Kunde Portal</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">Velkommen, {mockProjectData.clientName}!</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              <Button
                variant="ghost"
                onClick={navigateToMain}
                title="Gå til hovedside"
              >
                <Home size={18} />
              </Button>

              <Button
                variant="outline"
                onClick={handleSignOut}
                title="Log ud"
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Project Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Project Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{mockProjectData.projectName}</span>
                  <Badge className="bg-blue-100 text-blue-800">{mockProjectData.currentPhase}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Samlet fremgang</span>
                      <span>{mockProjectData.overallProgress}%</span>
                    </div>
                    <Progress value={mockProjectData.overallProgress} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Projektstart:</p>
                      <p className="font-medium">{new Date(mockProjectData.startDate).toLocaleDateString('da-DK')}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Estimeret launch:</p>
                      <p className="font-medium">{new Date(mockProjectData.estimatedLaunch).toLocaleDateString('da-DK')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 size={20} />
                  Website Statistik
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sidevisninger:</span>
                    <span className="font-medium">{mockProjectData.metrics.pageViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unikke besøgende:</span>
                    <span className="font-medium">{mockProjectData.metrics.uniqueVisitors.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bounce rate:</span>
                    <span className="font-medium">{mockProjectData.metrics.bounceRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. session:</span>
                    <span className="font-medium">{mockProjectData.metrics.avgSessionTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Phases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap size={20} />
                Projekt Faser
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProjectData.phases.map((phase: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(phase.status)}
                        <h3 className="font-medium">{phase.name}</h3>
                      </div>
                      {getStatusBadge(phase.status)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Fremgang</span>
                        <span>{phase.progress}%</span>
                      </div>
                      <Progress value={phase.progress} className="h-2" />
                      <p className="text-sm text-gray-600">
                        Estimeret færdig: {new Date(phase.estimatedCompletion).toLocaleDateString('da-DK')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={20} />
                Seneste Opdateringer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProjectData.recentUpdates.map((update: any, index: number) => (
                  <div key={index}>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium">{update.title}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(update.date).toLocaleDateString('da-DK')}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{update.description}</p>
                      </div>
                    </div>
                    {index < mockProjectData.recentUpdates.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={navigateToMain}
            >
              <Globe size={24} />
              <span>Se Hjemmeside</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              disabled
            >
              <Users size={24} />
              <span>Kontakt Support</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              disabled
            >
              <Settings size={24} />
              <span>Indstillinger</span>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default CustomerDashboard
