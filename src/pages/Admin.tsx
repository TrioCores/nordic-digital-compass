import { useAuth } from '@/hooks/useAuth'
import ProtectedRoute from '@/components/admin/ProtectedRoute'
import AdminDashboard from '@/components/admin/AdminDashboard'
import SEO from '@/components/SEO'

const AdminPage = () => {
  return (
    <>
      <SEO
        title="Admin Panel - Nordweb"
        description="Administrator panel med dokumenter og fil system"
        noindex={true}
      />
      
      <ProtectedRoute requireAdmin={true}>
        <AdminDashboard />
      </ProtectedRoute>
    </>
  )
}

export default AdminPage
