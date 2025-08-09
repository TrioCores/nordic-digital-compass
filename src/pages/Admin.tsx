import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Users,
  FileText,
  Upload,
  Edit3,
  Eye,
  Plus,
  Search,
  Shield,
  Crown,
  BarChart3,
  Download,
  Trash2,
  UserPlus,
  Settings,
  File,
  Image,
  FileSpreadsheet,
  Tag,
  X,
  Filter,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AdminProjectManagement } from "@/components/AdminProjectManagement";
import axios from "axios";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: "user" | "admin" | "owner";
  created_at: string;
  is_customer?: boolean; // Add this line
}

interface Project {
  id: string;
  project_name: string;
  client_name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

interface ProjectPhase {
  id: string;
  project_id: string;
  phase_name: string;
  phase_order: number;
  status: string;
  progress: number;
}

interface Document {
  id: string;
  name: string;
  original_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
  tags?: string[];
}

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [phases, setPhases] = useState<ProjectPhase[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [customers, setCustomers] = useState<UserProfile[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [documentFilter, setDocumentFilter] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState<string>("");
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    customerId: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Predefinerede tags organiseret i kategorier
  const TAG_CATEGORIES = {
    "📄 Dokumenttyper": [
      "📄 Kontrakt",
      "🧾 Faktura",
      "💰 Tilbud",
      "📊 Rapport",
      "📖 Manual",
    ],
    "🎯 Prioritet": ["🔥 Vigtig", "⚠️ Kritisk", "📝 Almindelig", "⬇️ Lav"],
    "🏷️ Kategorier": [
      "🎨 Logo",
      "📢 Marketing",
      "🌐 Web",
      "🖨️ Print",
      "📱 Social",
    ],
    "📆 Tidsperioder": [
      "🗓️ 2025",
      "📅 2024",
      "🌸 Q1",
      "☀️ Q2",
      "🍂 Q3",
      "❄️ Q4",
    ],
    "💼 Økonomi": ["💸 Moms", "💼 Regnskab", "💰 Budget", "📈 Investering"],
    "🚀 Projekter": ["🖥️ Website", "📱 App", "🎨 Design", "⚡ Udvikling"],
    "📊 Status": [
      "✅ Færdig",
      "🔄 Igangværende",
      "⏳ Afventer",
      "📦 Arkiveret",
    ],
  };

  // Flatten alle tags til bagudkompatibilitet
  const PREDEFINED_TAGS = Object.values(TAG_CATEGORIES).flat();

  useEffect(() => {
    initializeAdmin();
  }, []);

  const initializeAdmin = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/");
        return;
      }

      setUser(session.user);

      // Forsøg at hente profil data
      try {
        const { data: profileData, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileData) {
          setProfile({
            ...profileData,
            role: profileData.role as "user" | "admin" | "owner",
          });
        } else if (error) {
          console.error("Error fetching profile:", error);

          // Hvis profil ikke findes, opret en ny for ejere
          const isOwner =
            session.user.email === "emilmh.nw@outlook.dk" ||
            session.user.email === "Mikkelwb.nw@outlook.dk";

          if (isOwner) {
            // Sæt default profil for ejere
            setProfile({
              id: session.user.id,
              email: session.user.email!,
              full_name:
                session.user.user_metadata?.full_name || session.user.email!,
              role: "owner",
              created_at: new Date().toISOString(),
            });
          }
        }
      } catch (profileError) {
        console.error("Profile fetch failed:", profileError);
        // Fallback profil hvis alt fejler
        const isOwner =
          session.user.email === "emilmh.nw@outlook.dk" ||
          session.user.email === "Mikkelwb.nw@outlook.dk";

        if (isOwner) {
          setProfile({
            id: session.user.id,
            email: session.user.email!,
            full_name:
              session.user.user_metadata?.full_name || session.user.email!,
            role: "owner",
            created_at: new Date().toISOString(),
          });
        }
      }

      await fetchData();
    } catch (error) {
      console.error("Error initializing admin:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await Promise.all([fetchUsers(), fetchProjects(), fetchDocuments()]);
  };

  const fetchUsers = async () => {
    try {
      console.log("Fetching users...");

      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching users:", error);

        // Hvis RLS blokerer, prøv med service role eller fallback
        if (
          error.code === "PGRST116" ||
          error.message?.includes("row-level security")
        ) {
          console.log(
            "RLS blocking user fetch, trying alternative approach..."
          );

          // Prøv at få den nuværende brugers profil i det mindste
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session) {
            const { data: currentUser } = await supabase
              .from("user_profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();

            if (currentUser) {
              setUsers([
                {
                  ...currentUser,
                  role: currentUser.role as "user" | "admin" | "owner",
                },
              ]);
            }
          }
          return;
        }
        throw error;
      }

      if (data) {
        console.log("Users fetched successfully:", data.length);
        setUsers(
          data.map((user) => ({
            ...user,
            role: user.role as "user" | "admin" | "owner",
          }))
        );
      } else {
        console.log("No users found");
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      // Vis tom liste hvis der er fejl
      setUsers([]);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchProjectPhases = async (projectId: string) => {
    try {
      const { data } = await supabase
        .from("project_phases")
        .select("*")
        .eq("project_id", projectId)
        .order("phase_order");

      if (data) {
        setPhases(data);
      }
    } catch (error) {
      console.error("Error fetching project phases:", error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const { data } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        const documentsWithTags = data.map((doc) => ({
          ...doc,
          tags: doc.tags || [],
        }));
        setDocuments(documentsWithTags);

        // Brug predefinerede tags plus eksisterende tags fra dokumenter
        const existingTags = new Set<string>();
        documentsWithTags.forEach((doc) => {
          if (doc.tags) {
            doc.tags.forEach((tag) => existingTags.add(tag));
          }
        });

        // Kombiner predefinerede tags med eksisterende (uden dubletter)
        const combinedTags = [
          ...new Set([...PREDEFINED_TAGS, ...Array.from(existingTags)]),
        ];
        setAllTags(combinedTags.sort());
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const addTagToDocument = async (documentId: string, tag: string) => {
    try {
      const document = documents.find((doc) => doc.id === documentId);
      if (!document) return;

      const newTags = [...(document.tags || []), tag];

      const { error } = await supabase
        .from("documents")
        .update({ tags: newTags })
        .eq("id", documentId);

      if (error) throw error;

      toast({
        title: "Tag tilføjet",
        description: `Tag "${tag}" er tilføjet til dokumentet.`,
      });

      fetchDocuments();
    } catch (error) {
      console.error("Error adding tag:", error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved tilføjelse af tag.",
        variant: "destructive",
      });
    }
  };

  const removeTagFromDocument = async (
    documentId: string,
    tagToRemove: string
  ) => {
    try {
      const document = documents.find((doc) => doc.id === documentId);
      if (!document) return;

      const newTags = (document.tags || []).filter(
        (tag) => tag !== tagToRemove
      );

      const { error } = await supabase
        .from("documents")
        .update({ tags: newTags })
        .eq("id", documentId);

      if (error) throw error;

      toast({
        title: "Tag fjernet",
        description: `Tag "${tagToRemove}" er fjernet fra dokumentet.`,
      });

      fetchDocuments();
    } catch (error) {
      console.error("Error removing tag:", error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved fjernelse af tag.",
        variant: "destructive",
      });
    }
  };

  const getFilteredDocuments = () => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(documentFilter.toLowerCase()) ||
        doc.original_name.toLowerCase().includes(documentFilter.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => doc.tags?.includes(tag));

      return matchesSearch && matchesTags;
    });
  };

  const updateUserRole = async (userId: string, role: string) => {
    try {
      console.log("Updating user role:", { userId, role });

      const { data, error } = await supabase
        .from("user_profiles")
        .update({ role })
        .eq("id", userId)
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Update successful:", data);

      // Opdater lokal state med det samme
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? { ...user, role: role as "user" | "admin" | "owner" }
            : user
        )
      );

      toast({
        title: "Rolle opdateret",
        description: `Brugerens rolle er ændret til ${
          role === "admin" ? "Admin" : role === "owner" ? "Ejer" : "Bruger"
        }.`,
      });

      // Fetch igen for at sikre konsistens
      await fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved opdatering af rolle. Prøv igen.",
        variant: "destructive",
      });
    }
  };

  const updatePhaseProgress = async (
    phaseId: string,
    progress: number,
    status: string
  ) => {
    try {
      const { error } = await supabase
        .from("project_phases")
        .update({ progress, status })
        .eq("id", phaseId);

      if (error) throw error;

      toast({
        title: "Fase opdateret",
        description: "Projektfasens fremskridt er blevet opdateret.",
      });

      if (selectedProject) {
        fetchProjectPhases(selectedProject);
      }
    } catch (error) {
      console.error("Error updating phase:", error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved opdatering af fase.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      let successCount = 0;
      let errorCount = 0;

      for (const file of files) {
        try {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}.${fileExt}`;
          const filePath = `admin-documents/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("admin-documents")
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { error: dbError } = await supabase.from("documents").insert({
            name: file.name.split(".")[0],
            original_name: file.name,
            file_path: filePath,
            file_type: file.type,
            file_size: file.size,
            uploaded_by: user.id,
          });

          if (dbError) throw dbError;
          successCount++;
        } catch (error) {
          console.error(`Error uploading file ${file.name}:`, error);
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast({
          title: "Upload fuldført",
          description: `${successCount} dokument(er) uploadet succesfuldt${
            errorCount > 0 ? `, ${errorCount} fejlede` : ""
          }.`,
        });
        fetchDocuments();
      }

      if (errorCount > 0 && successCount === 0) {
        toast({
          title: "Upload fejl",
          description: "Alle uploads fejlede. Prøv igen.",
          variant: "destructive",
        });
      }

      event.target.value = "";
    } catch (error) {
      console.error("Error uploading files:", error);
      toast({
        title: "Upload fejl",
        description: "Der opstod en uventet fejl ved upload.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const downloadDocument = async (document: Document) => {
    try {
      const { data, error } = await supabase.storage
        .from("admin-documents")
        .download(document.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = window.document.createElement("a");
      a.href = url;
      a.download = document.original_name;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      toast({
        title: "Download fejl",
        description: "Der opstod en fejl ved download af dokumentet.",
        variant: "destructive",
      });
    }
  };

  const deleteDocument = async (document: Document) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("admin-documents")
        .remove([document.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("documents")
        .delete()
        .eq("id", document.id);

      if (dbError) throw dbError;

      toast({
        title: "Dokument slettet",
        description: "Dokumentet er blevet slettet succesfuldt.",
      });

      fetchDocuments();
    } catch (error) {
      console.error("Error deleting document:", error);
      toast({
        title: "Sletning fejl",
        description: "Der opstod en fejl ved sletning af dokumentet.",
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case "admin":
        return <Shield className="h-4 w-4 text-blue-500" />;
      default:
        return <Users className="h-4 w-4 text-gray-500" />;
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/"))
      return <Image className="h-5 w-5 text-green-500" />;
    if (fileType === "application/pdf")
      return <FileText className="h-5 w-5 text-red-500" />;
    if (fileType.includes("spreadsheet") || fileType.includes("excel"))
      return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
    if (fileType.includes("document") || fileType.includes("word"))
      return <File className="h-5 w-5 text-blue-500" />;
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileTypeLabel = (fileType: string) => {
    if (fileType.startsWith("image/")) return "Billede";
    if (fileType === "application/pdf") return "PDF";
    if (fileType.includes("spreadsheet") || fileType.includes("excel"))
      return "Regneark";
    if (fileType.includes("document") || fileType.includes("word"))
      return "Dokument";
    return "Fil";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in_progress":
        return "bg-blue-500";
      case "pending":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("id, full_name, email, role, created_at");

      if (error) {
        console.error("Error fetching customers:", error);
        toast({
          title: "Fejl",
          description: "Kunne ikke hente kunder fra databasen.",
          variant: "destructive",
        });
        return;
      }

      setCustomers(
        (data || []).map((customer) => ({
          ...customer,
          role: customer.role as "user" | "admin" | "owner",
        }))
      );
    } catch (error) {
      console.error("Unexpected error fetching customers:", error);
      toast({
        title: "Fejl",
        description: "Der opstod en uventet fejl ved hentning af kunder.",
        variant: "destructive",
      });
    }
  };

  const toggleCustomerStatus = async (userId: string) => {
    try {
      toast({
        title: "Funktion ikke understøttet",
        description: "Kundestatus kan ikke ændres, da feltet ikke findes.",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Unexpected error updating customer status:", error);
      toast({
        title: "Fejl",
        description:
          "Der opstod en uventet fejl ved opdatering af kundestatus.",
        variant: "destructive",
      });
    }
  };

  const createCustomer = async (name: string, email: string) => {
    try {
      // Generer et id for kunden
      const id = crypto.randomUUID();

      // Først indsæt kunden i user_profiles
      const { data, error } = await supabase.from("user_profiles").insert({
        id,
        full_name: name,
        email,
      });
      if (error) throw error;

      toast({
        title: "Kunde oprettet",
        description: `Kunden ${name} er oprettet.`,
      });
      fetchCustomers();
    } catch (error) {
      console.error("Fejl ved oprettelse af kunde:", error);
      toast({ title: "Fejl", description: "Kunne ikke oprette kunden." });
    }
  };

  const createProject = async (
    customerId: string,
    projectName: string,
    description: string
  ) => {
    try {
      const { data, error } = await supabase.from("projects").insert({
        user_id: customerId,
        client_name:
          customers.find((c) => c.id === customerId)?.full_name || "",
        project_name: projectName,
        description,
      });
      if (error) throw error;
      toast({
        title: "Projekt oprettet",
        description: `Projektet ${projectName} er oprettet.`,
      });
      fetchProjects();
    } catch (error) {
      console.error("Fejl ved oprettelse af projekt:", error);
      toast({ title: "Fejl", description: "Kunne ikke oprette projektet." });
    }
  };

  const handleCreateProject = () => {
    createProject(
      newProject.customerId,
      newProject.name,
      newProject.description
    );
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
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Administration
              </h1>
              <p className="text-muted-foreground">
                Administrer brugere, projekter og dokumenter
              </p>
            </div>
            <div className="flex items-center gap-2">
              {profile?.role && getRoleIcon(profile.role)}
              <Badge variant="outline">
                {profile?.role === "owner" ? "Ejer" : "Administrator"}
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="users" className="space-y-6">
            <TabsList>
              <TabsTrigger value="users">Brugerhåndtering</TabsTrigger>
              <TabsTrigger value="documents">Dokumenter</TabsTrigger>
              <TabsTrigger value="projects">Projekt Management</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <AdminProjectManagement
                projects={projects}
                onProjectsUpdate={fetchProjects}
              />
              {/* Project Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Vælg Projekt</CardTitle>
                  <CardDescription>
                    Vælg et projekt for at administrere dets fremskridt
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={selectedProject}
                    onValueChange={(value) => {
                      setSelectedProject(value);
                      fetchProjectPhases(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Vælg et projekt" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.project_name} - {project.client_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Project Phases */}
              {selectedProject && (
                <Card>
                  <CardHeader>
                    <CardTitle>Projekt Faser</CardTitle>
                    <CardDescription>
                      Opdater fremskridt og status for hver fase
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {phases.map((phase) => (
                        <div key={phase.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">
                              {phase.phase_name}
                            </h4>
                            <Badge className={getStatusColor(phase.status)}>
                              {phase.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor={`progress-${phase.id}`}>
                                Fremskridt (%)
                              </Label>
                              <Input
                                id={`progress-${phase.id}`}
                                type="number"
                                min="0"
                                max="100"
                                value={phase.progress}
                                onChange={(e) => {
                                  const newProgress = parseInt(e.target.value);
                                  const newStatus =
                                    newProgress === 100
                                      ? "completed"
                                      : newProgress > 0
                                      ? "in_progress"
                                      : "pending";
                                  updatePhaseProgress(
                                    phase.id,
                                    newProgress,
                                    newStatus
                                  );
                                }}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`status-${phase.id}`}>
                                Status
                              </Label>
                              <Select
                                value={phase.status}
                                onValueChange={(value) =>
                                  updatePhaseProgress(
                                    phase.id,
                                    phase.progress,
                                    value
                                  )
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">
                                    Afventer
                                  </SelectItem>
                                  <SelectItem value="in_progress">
                                    I gang
                                  </SelectItem>
                                  <SelectItem value="completed">
                                    Færdig
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-end">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${phase.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              {/* User Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Brugere
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{users.length}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Administratorer
                    </CardTitle>
                    <Shield className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {users.filter((u) => u.role === "admin").length}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ejere</CardTitle>
                    <Crown className="h-4 w-4 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {users.filter((u) => u.role === "owner").length}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Almindelige Brugere
                    </CardTitle>
                    <Users className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {users.filter((u) => u.role === "user").length}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* User Management */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Brugerhåndtering
                      </CardTitle>
                      <CardDescription>
                        Administrer brugerroller og tilladelser
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Søg brugere..."
                          className="pl-8 w-64"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((userData) => (
                      <div
                        key={userData.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {getRoleIcon(userData.role)}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-lg">
                                {userData.full_name}
                              </h4>
                              <Badge
                                variant={
                                  userData.role === "owner"
                                    ? "default"
                                    : userData.role === "admin"
                                    ? "secondary"
                                    : "outline"
                                }
                                className={`
                                  ${
                                    userData.role === "owner"
                                      ? "bg-yellow-500 text-white"
                                      : ""
                                  }
                                  ${
                                    userData.role === "admin"
                                      ? "bg-blue-500 text-white"
                                      : ""
                                  }
                                `}
                              >
                                {userData.role === "owner"
                                  ? "Ejer"
                                  : userData.role === "admin"
                                  ? "Admin"
                                  : "Bruger"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {userData.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Oprettet:{" "}
                              {new Date(userData.created_at).toLocaleDateString(
                                "da-DK",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {userData.email !== "emilmh.nw@outlook.dk" &&
                            userData.email !== "Mikkelwb.nw@outlook.dk" && (
                              <Select
                                key={`role-select-${userData.id}-${userData.role}`}
                                value={userData.role}
                                onValueChange={(value) =>
                                  updateUserRole(userData.id, value)
                                }
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user">
                                    <div className="flex items-center gap-2">
                                      <Users className="h-4 w-4" />
                                      Bruger
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="admin">
                                    <div className="flex items-center gap-2">
                                      <Shield className="h-4 w-4" />
                                      Admin
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="owner">
                                    <div className="flex items-center gap-2">
                                      <Crown className="h-4 w-4" />
                                      Ejer
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          {(userData.email === "emilmh.nw@outlook.dk" ||
                            userData.email === "Mikkelwb.nw@outlook.dk") && (
                            <Badge variant="outline" className="text-xs">
                              Beskyttet
                            </Badge>
                          )}

                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Kundehåndtering</CardTitle>
                  <CardDescription>
                    Marker brugere som kunder for at tildele dem projekter.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-semibold">{user.full_name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                        <Button
                          variant={user.is_customer ? "secondary" : "outline"}
                          onClick={() => toggleCustomerStatus(user.id)}
                        >
                          {user.is_customer
                            ? "Fjern som kunde"
                            : "Marker som kunde"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              {/* Document Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Dokumenter
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{documents.length}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      PDF Filer
                    </CardTitle>
                    <FileText className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {
                        documents.filter(
                          (d) => d.file_type === "application/pdf"
                        ).length
                      }
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Billeder
                    </CardTitle>
                    <Image className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {
                        documents.filter((d) =>
                          d.file_type.startsWith("image/")
                        ).length
                      }
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Størrelse
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatFileSize(
                        documents.reduce((sum, doc) => sum + doc.file_size, 0)
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        Upload Dokumenter
                      </CardTitle>
                      <CardDescription>
                        Upload PDF, billeder, dokumenter og andre filer
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 hover:border-muted-foreground/50 transition-colors">
                    <div className="flex flex-col items-center gap-4">
                      <div className="rounded-full bg-muted p-3">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="text-center">
                        <Label htmlFor="file-upload" className="cursor-pointer">
                          <span className="text-lg font-medium hover:text-primary transition-colors">
                            Klik for at uploade filer
                          </span>
                          <br />
                          <span className="text-sm text-muted-foreground">
                            eller træk og slip her
                          </span>
                        </Label>
                        <p className="text-xs text-muted-foreground mt-2">
                          Understøtter: PDF, Word, Excel, billeder (PNG, JPG,
                          GIF)
                        </p>
                      </div>
                      <Input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.txt"
                      />
                      {uploading && (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          <p className="text-sm text-muted-foreground">
                            Uploader filer...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents List */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Dokumentbibliotek
                      </CardTitle>
                      <CardDescription>
                        Administrer og download uploadede dokumenter
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Søg dokumenter..."
                          className="pl-8 w-64"
                          value={documentFilter}
                          onChange={(e) => setDocumentFilter(e.target.value)}
                        />
                      </div>

                      {/* Tag filter */}
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Select
                          value=""
                          onValueChange={(tag) => {
                            if (tag && !selectedTags.includes(tag)) {
                              setSelectedTags([...selectedTags, tag]);
                            }
                          }}
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filtrer efter tags" />
                          </SelectTrigger>
                          <SelectContent>
                            {/* Predefinerede tags organiseret i kategorier */}
                            {Object.entries(TAG_CATEGORIES).map(
                              ([categoryName, tags], categoryIndex) => (
                                <div key={categoryName}>
                                  {categoryIndex > 0 && (
                                    <Separator className="my-1" />
                                  )}
                                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                    {categoryName}
                                  </div>
                                  {tags.map((tag) => (
                                    <SelectItem
                                      key={tag}
                                      value={tag}
                                      className="pl-4"
                                    >
                                      <div className="flex items-center gap-2">
                                        <Tag className="h-3 w-3" />
                                        {tag}
                                      </div>
                                    </SelectItem>
                                  ))}
                                </div>
                              )
                            )}

                            {/* Eksisterende tags der ikke er i predefinerede kategorier */}
                            {(() => {
                              const existingTags = allTags.filter(
                                (tag) => !PREDEFINED_TAGS.includes(tag)
                              );
                              if (existingTags.length > 0) {
                                return (
                                  <div>
                                    <Separator className="my-1" />
                                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                      🔖 Eksisterende Tags
                                    </div>
                                    {existingTags.map((tag) => (
                                      <SelectItem
                                        key={tag}
                                        value={tag}
                                        className="pl-4"
                                      >
                                        <div className="flex items-center gap-2">
                                          <Tag className="h-3 w-3" />
                                          {tag}
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </div>
                                );
                              }
                              return null;
                            })()}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Active tag filters */}
                    {selectedTags.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-muted-foreground">
                          Aktive filtre:
                        </span>
                        {selectedTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() =>
                              setSelectedTags(
                                selectedTags.filter((t) => t !== tag)
                              )
                            }
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                            <X className="h-3 w-3" />
                          </Badge>
                        ))}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTags([])}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          Ryd alle
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {getFilteredDocuments().length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        {documents.length === 0
                          ? "Ingen dokumenter"
                          : "Ingen dokumenter matcher din søgning"}
                      </h3>
                      <p className="text-muted-foreground">
                        {documents.length === 0
                          ? "Upload det første dokument for at komme i gang"
                          : "Prøv at justere dine søgekriterier eller tags"}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {getFilteredDocuments().map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-start justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-4 flex-1">
                            <div className="flex-shrink-0 mt-1">
                              {getFileIcon(doc.file_type)}
                            </div>
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{doc.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {getFileTypeLabel(doc.file_type)}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {doc.original_name}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>{formatFileSize(doc.file_size)}</span>
                                <span>•</span>
                                <span>
                                  Uploadet{" "}
                                  {new Date(doc.created_at).toLocaleDateString(
                                    "da-DK",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </span>
                              </div>

                              {/* Tags sektion */}
                              <div className="space-y-2">
                                {/* Eksisterende tags */}
                                {doc.tags && doc.tags.length > 0 && (
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs text-muted-foreground">
                                      Tags:
                                    </span>
                                    {doc.tags.map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="text-xs flex items-center gap-1 group cursor-pointer"
                                        onClick={() =>
                                          removeTagFromDocument(doc.id, tag)
                                        }
                                      >
                                        <Tag className="h-3 w-3" />
                                        {tag}
                                        <X className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </Badge>
                                    ))}
                                  </div>
                                )}

                                {/* Tilføj nyt tag */}
                                <div className="flex items-center gap-2">
                                  <Select
                                    value={newTagInput}
                                    onValueChange={(value) =>
                                      setNewTagInput(value)
                                    }
                                  >
                                    <SelectTrigger className="h-6 text-xs flex-1 max-w-32">
                                      <SelectValue placeholder="Vælg tag..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.entries(TAG_CATEGORIES).map(
                                        (
                                          [categoryName, tags],
                                          categoryIndex
                                        ) => (
                                          <div key={categoryName}>
                                            {categoryIndex > 0 && (
                                              <Separator className="my-1" />
                                            )}
                                            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                              {categoryName}
                                            </div>
                                            {tags.map((tag) => (
                                              <SelectItem
                                                key={tag}
                                                value={tag}
                                                className="pl-4"
                                              >
                                                {tag}
                                              </SelectItem>
                                            ))}
                                          </div>
                                        )
                                      )}
                                    </SelectContent>
                                  </Select>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                      if (newTagInput.trim()) {
                                        addTagToDocument(
                                          doc.id,
                                          newTagInput.trim()
                                        );
                                        setNewTagInput("");
                                      }
                                    }}
                                    className="h-6 w-6 p-0"
                                    disabled={!newTagInput.trim()}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadDocument(doc)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Slet dokument
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Er du sikker på du vil slette "{doc.name}"?
                                    <br />
                                    Denne handling kan ikke fortrydes.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Annuller
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteDocument(doc)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Slet dokument
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* New Project Creation Section */}
          <Card>
            <CardHeader>
              <CardTitle>Opret Projekt</CardTitle>
              <CardDescription>
                Opret et nyt projekt og tildel det til en kunde.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Projekt Navn"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Projekt Beskrivelse"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                />
                <Select
                  value={newProject.customerId}
                  onValueChange={(value) =>
                    setNewProject({ ...newProject, customerId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Vælg Kunde" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleCreateProject}>Opret Projekt</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
