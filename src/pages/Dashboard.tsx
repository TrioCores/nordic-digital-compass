import { useAuth } from '@/hooks/useAuth'
import ProtectedRoute from '@/components/admin/ProtectedRoute'
import CustomerDashboard from '@/components/admin/CustomerDashboard'
import SEO from '@/components/SEO'

const DashboardPage = () => {
  return (
    <>
      <SEO
        title="Mit Projekt - Nordweb"
        description="Kunde dashboard - se status på dit hjemmeside projekt"
        noindex={true}
      />
      
      <ProtectedRoute requireAdmin={false}>
        <CustomerDashboard />
      </ProtectedRoute>
    </>
  )
}

export default DashboardPage