import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut, Crown, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'user' | 'admin' | 'owner';
  subscription_type?: string;
}

export const UserMenu = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile({...data, role: data.role as 'user' | 'admin' | 'owner'});
      } else {
        // Create profile if it doesn't exist
        const { data: newProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert({
            id: userId,
            email: user?.email,
            full_name: user?.user_metadata?.full_name || '',
            role: 'user'
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
        } else {
          setProfile({...newProfile, role: newProfile.role as 'user' | 'admin' | 'owner'});
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logget ud",
        description: "Du er nu logget ud.",
      });
    } catch (error: any) {
      toast({
        title: "Fejl ved logout",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'owner':
        return 'Ejer';
      case 'admin':
        return 'Administrator';
      default:
        return 'Bruger';
    }
  };

  if (!user) return null;

  const initials = profile?.full_name 
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email?.[0]?.toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile?.full_name || 'Bruger'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {profile?.role && getRoleIcon(profile.role)}
              <span className="text-xs text-muted-foreground">
                {profile?.role && getRoleLabel(profile.role)}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
          <User className="mr-2 h-4 w-4" />
          <span>Kundeportal</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Indstillinger</span>
        </DropdownMenuItem>
        {(profile?.role === 'admin' || profile?.role === 'owner') && (
          <DropdownMenuItem onClick={() => navigate('/admin')}>
            <Shield className="mr-2 h-4 w-4" />
            <span>Administration</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log ud</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};