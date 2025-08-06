import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Toaster } from '@/components/ui/toaster'
import DocumentUpload from './DocumentUpload'
import DocumentList from './DocumentList'
import UserManagement from './UserManagement'
import ProjectManagement from './ProjectManagement'
import { 
  Shield, 
  LogOut, 
  Upload, 
  Files, 
  Users, 
  Settings,
  BarChart3,
  Home,
  FolderOpen
} from 'lucide-react'
import { motion } from 'framer-motion'

const AdminDashboard = () => {
  const { user, signOut, isOwner } = useAuth()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const navigateToMain = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="text-primary" size={28} />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500">Nordweb Administration</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">{user?.email}</p>
                <Badge variant={isOwner() ? "default" : "secondary"}>
                  {user?.role === 'owner' ? 'Ejer' : 'Admin'}
                </Badge>
              </div>

              <Button
                variant="outline"
                onClick={navigateToMain}
                className="flex items-center gap-2"
                title="Gå til hovedside"
              >
                <Home size={18} />
                Hjem
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
        >
          {/* Welcome Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Velkommen tilbage, {user?.email?.split('@')[0]}!
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Sidste login</p>
                  <p className="font-medium">{new Date().toLocaleDateString('da-DK')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Tabs */}
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <FolderOpen size={18} />
                Projekter
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <Files size={18} />
                Dokumenter
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload size={18} />
                Upload
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2" disabled={!isOwner()}>
                <Users size={18} />
                Brugere
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings size={18} />
                Indstillinger
              </TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <ProjectManagement />
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <DocumentList refreshTrigger={refreshTrigger} />
            </TabsContent>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-6">
              <DocumentUpload onUploadSuccess={handleUploadSuccess} />
            </TabsContent>

            {/* Users Tab (Owner only) */}
            <TabsContent value="users" className="space-y-6">
              <UserManagement />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings size={20} />
                    System Indstillinger
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Account Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium">{user?.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rolle:</span>
                          <Badge variant={isOwner() ? "default" : "secondary"}>
                            {user?.role === 'owner' ? 'Ejer' : 'Admin'}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">User ID:</span>
                          <span className="font-mono text-sm">{user?.id}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">System Status</h3>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-green-800 font-medium">System Operationel</span>
                        </div>
                        <p className="text-green-600 text-sm mt-1">
                          Alle systemer kører normalt i dashboardet.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  )
}

export default AdminDashboard
