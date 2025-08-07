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

      // Hvis det er Emil eller Mikkel, giv altid admin adgang
      const isOwner = session.user.email === 'emilmh.nw@outlook.com' || 
                     session.user.email === 'Mikkelwb.nw@outlook.dk';

      if (isOwner) {
        setAuthorized(true);
        setLoading(false);
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

      if (error) {
        console.error('Error fetching profile:', error);
        
        // Hvis RLS blokerer, men brugeren er autentificeret, prøv at oprette profilen
        if (error.code === 'PGRST116' || error.message?.includes('row-level security')) {
          // Prøv at oprette profil hvis den mangler
          const { error: insertError } = await supabase
            .from('user_profiles')
            .insert({
              id: session.user.id,
              email: session.user.email,
              full_name: session.user.user_metadata?.full_name || session.user.email,
              role: 'user'
            });

          if (!insertError) {
            // Hvis profil blev oprettet, prøv igen
            setLoading(false);
            checkAccess();
            return;
          }
        }

        // Hvis admin/owner adgang kræves, nægt adgang
        if (adminOnly || requiredRole !== 'user') {
          toast({
            title: "Adgang nægtet",
            description: "Din brugerprofil kunne ikke findes. Kontakt support.",
            variant: "destructive",
          });
          navigate('/');
          return;
        } else {
          // Tillad almindelig brugeradgang
          setAuthorized(true);
        }
      } else if (!profileData) {
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
      
      // Fallback for ejere hvis der er database problemer
      const { data: { session } } = await supabase.auth.getSession();
      const isOwner = session?.user?.email === 'emilmh.nw@outlook.com' || 
                     session?.user?.email === 'Mikkelwb.nw@outlook.dk';
      
      if (isOwner) {
        setAuthorized(true);
      } else {
        navigate('/');
      }
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
