import { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import AdminLogin from './AdminLogin'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: ReactNode
  requireAdmin?: boolean
  requireOwner?: boolean
}

const ProtectedRoute = ({ 
  children, 
  requireAdmin = false, 
  requireOwner = false 
}: ProtectedRouteProps) => {
  const { user, loading, isAdmin, isOwner } = useAuth()

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-gray-600">Checker adgang...</p>
        </div>
      </div>
    )
  }

  // Not authenticated - show login
  if (!user) {
    return <AdminLogin />
  }

  // Check admin requirement
  if (requireAdmin && !isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Adgang Nægtet</h2>
          <p className="text-gray-600 mb-4">
            Du har ikke admin rettigheder til at tilgå denne side.
          </p>
          <p className="text-sm text-gray-500">
            Kontakt en administrator hvis du mener dette er en fejl.
          </p>
        </div>
      </div>
    )
  }

  // Check owner requirement
  if (requireOwner && !isOwner()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Kun for Ejere</h2>
          <p className="text-gray-600 mb-4">
            Denne funktion er kun tilgængelig for systemejere.
          </p>
          <p className="text-sm text-gray-500">
            Du har admin adgang, men ikke ejer rettigheder.
          </p>
        </div>
      </div>
    )
  }

  // All checks passed - render children
  return <>{children}</>
}

export default ProtectedRoute
