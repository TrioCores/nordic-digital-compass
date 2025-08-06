import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Users, Plus, Edit, Shield } from 'lucide-react'

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  role: 'user' | 'admin' | 'owner'
  created_at: string
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isOwner } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (isOwner()) {
      fetchUsers()
    }
  }, [])

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setError('Kunne ikke hente brugere')
      } else {
        setUsers(data || [])
      }
    } catch (err) {
      setError('Der opstod en fejl')
    } finally {
      setLoading(false)
    }
  }

  const updateUserRole = async (userId: string, newRole: 'user' | 'admin' | 'owner') => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) {
        toast({
          title: "Fejl",
          description: "Kunne ikke opdatere brugerrolle",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Succes",
          description: "Brugerrolle blev opdateret",
        })
        fetchUsers() // Refresh list
      }
    } catch (err) {
      toast({
        title: "Fejl", 
        description: "Der opstod en uventet fejl",
        variant: "destructive",
      })
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'owner': return 'default'
      case 'admin': return 'secondary'
      default: return 'outline'
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'owner': return 'Ejer'
      case 'admin': return 'Admin'
      default: return 'Bruger'
    }
  }

  if (!isOwner()) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <Shield className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500">Kun ejere kan administrere brugere</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users size={20} />
          Brugeradministration
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Henter brugere...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Total brugere: {users.length}
              </p>
              <Button onClick={fetchUsers} variant="outline" size="sm">
                Opdater
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Navn</TableHead>
                  <TableHead>Rolle</TableHead>
                  <TableHead>Oprettet</TableHead>
                  <TableHead>Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>{user.full_name || 'Ikke angivet'}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {getRoleText(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString('da-DK')}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(newRole) => 
                          updateUserRole(user.id, newRole as 'user' | 'admin' | 'owner')
                        }
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default UserManagement
