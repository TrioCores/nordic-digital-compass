import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin' | 'owner';
  adminOnly?: boolean;
}

export const ProtectedRoute = ({ children, requiredRole = 'user', adminOnly = false }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/');
        return;
      }

      // If we only need authentication (not specific roles), allow access
      if (!adminOnly && requiredRole === 'user') {
        setAuthorized(true);
        setLoading(false);
        return;
      }

      // Check user profile and role
      const { data: profileData, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (error || !profileData) {
        // If profile doesn't exist yet, deny admin access but allow user access
        if (adminOnly || requiredRole !== 'user') {
          toast({
            title: "Adgang nægtet",
            description: "Din brugerprofil er ikke klar endnu. Prøv igen om lidt.",
            variant: "destructive",
          });
          navigate('/');
          return;
        } else {
          setAuthorized(true);
        }
      } else {
        // Check role permissions
        const userRole = profileData.role;
        
        if (adminOnly && !['admin', 'owner'].includes(userRole)) {
          toast({
            title: "Adgang nægtet",
            description: "Du har ikke tilladelse til at se denne side.",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        if (requiredRole === 'admin' && !['admin', 'owner'].includes(userRole)) {
          toast({
            title: "Adgang nægtet", 
            description: "Du skal være administrator for at se denne side.",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        if (requiredRole === 'owner' && userRole !== 'owner') {
          toast({
            title: "Adgang nægtet",
            description: "Kun ejere kan se denne side.",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        setAuthorized(true);
      }
    } catch (error) {
      console.error('Error checking access:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
};
