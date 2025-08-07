import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Save, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'user' | 'admin' | 'owner';
  subscription_type?: string;
}

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/');
        return;
      }

      setUser(session.user);
      await fetchUserProfile(session.user.id);
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setProfile({...data, role: data.role as 'user' | 'admin' | 'owner'});
        setFormData({
          full_name: data.full_name,
          email: data.email,
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSave = async () => {
    if (!profile) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: formData.full_name,
          email: formData.email,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (error) throw error;

      // Update auth user metadata if email changed
      if (formData.email !== user.email) {
        const { error: authError } = await supabase.auth.updateUser({
          email: formData.email,
        });

        if (authError) throw authError;
      }

      toast({
        title: "Profil opdateret",
        description: "Dine profiloplysninger er blevet gemt.",
      });

      // Refresh profile
      await fetchUserProfile(profile.id);
    } catch (error: any) {
      toast({
        title: "Fejl ved opdatering",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-yellow-500';
      case 'admin':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tilbage
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Profil</h1>
              <p className="text-muted-foreground">
                Administrer dine kontooplysninger
              </p>
            </div>
          </div>

          {/* Profile Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{profile?.full_name}</CardTitle>
                    <CardDescription>{profile?.email}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant="outline"
                    className={`${getRoleColor(profile?.role || 'user')} text-white mb-2`}
                  >
                    {getRoleLabel(profile?.role || 'user')}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {profile?.subscription_type || 'Basis abonnement'}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Edit Form */}
          <Card>
            <CardHeader>
              <CardTitle>Rediger Profil</CardTitle>
              <CardDescription>
                Opdater dine personlige oplysninger
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="full_name">Fulde navn</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="full_name"
                    placeholder="Dit fulde navn"
                    className="pl-10"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="din@email.dk"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  disabled={saving}
                >
                  Annuller
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Gemmer...' : 'Gem ændringer'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}