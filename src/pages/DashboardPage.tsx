import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useCandidates } from "@/hooks/useCandidates";
import { useLogout } from "@/hooks/useAuth";
import { Candidate } from "@/types/api";
import { 
  Search,
  Star,
  Briefcase,
  Mail,
  LogOut,
  User,
  MoreHorizontal,
  X,
  Phone,
  MapPin,
  Download,
  CheckCircle,
  UserCheck,
  Edit,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2
} from "lucide-react";

interface ExtendedCandidate extends Omit<Candidate, 'id'> {
  id: string;
  city?: string;
  area?: string;
  status?: "Desempregado" | "Primeiro emprego" | "Empregado insatisfeito";
  registerDate?: string;
  isFavorite?: boolean;
  curriculumUrl?: string;
  contactStatus?: "none" | "contacted" | "hired";
  contactedBy?: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useLogout();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("Kauan Debique");
  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<ExtendedCandidate | null>(null);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [localCandidates, setLocalCandidates] = useState<ExtendedCandidate[]>([]);
  const candidatesPerPage = 6;

  // Fetch candidates from API
  const { data: apiCandidates = [], isLoading, error } = useCandidates();

  // Process API data to match local interface
  useEffect(() => {
    if (apiCandidates.length > 0) {
      const processedCandidates: ExtendedCandidate[] = apiCandidates.map((candidate: Candidate) => ({
        ...candidate,
        id: candidate.id.toString(),
        city: "São Paulo, SP", // Default value - could be expanded
        area: "Geral", // Default value - could be expanded
        status: "Desempregado" as const, // Default value - could be expanded
        registerDate: new Date(candidate.created_at).toLocaleDateString('pt-BR'),
        isFavorite: false,
        curriculumUrl: candidate.resume || "curriculo.pdf",
        contactStatus: "none" as const,
      }));
      setLocalCandidates(processedCandidates);
    }
  }, [apiCandidates]);

  useEffect(() => {
    // Verificar se está autenticado
    const isAuth = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("userEmail");
    
    if (!isAuth) {
      navigate("/");
      return;
    }
    
    if (email) {
      setUserEmail(email);
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleFavorite = (candidateId: string | number) => {
    const id = candidateId.toString();
    setLocalCandidates(prev => 
      prev.map(candidate => 
        candidate.id === id 
          ? { ...candidate, isFavorite: !candidate.isFavorite }
          : candidate
      )
    );
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Desempregado":
        return "bg-red-100 text-red-700 border-red-200";
      case "Primeiro emprego":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Empregado insatisfeito":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Filtrar candidatos contratados
  const availableCandidates = localCandidates.filter(candidate => candidate.contactStatus !== "hired");
  
  const filteredCandidates = availableCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = !areaFilter || areaFilter === "all-areas" || candidate.area === areaFilter;
    const matchesStatus = !statusFilter || statusFilter === "all-situations" || candidate.status === statusFilter;
    const matchesFavorites = !showFavorites || candidate.isFavorite;
    
    return matchesSearch && matchesArea && matchesStatus && matchesFavorites;
  });

  // Paginação
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);
  const startIndex = (currentPage - 1) * candidatesPerPage;
  const paginatedCandidates = filteredCandidates.slice(startIndex, startIndex + candidatesPerPage);

  const clearFilters = () => {
    setAreaFilter("all-areas");
    setStatusFilter("all-situations");
    setShowFavorites(false);
  };

  const handleContactCandidate = (candidateId: string | number) => {
    const id = candidateId.toString();
    setLocalCandidates(prev => 
      prev.map(candidate => 
        candidate.id === id 
          ? { ...candidate, contactStatus: "contacted", contactedBy: userEmail }
          : candidate
      )
    );
    setSelectedCandidate(null);
    toast({
      title: "Contato registrado",
      description: "Marcado como 'Entrei em contato' com sucesso.",
    });
  };

  const handleHireCandidate = (candidateId: string | number) => {
    const id = candidateId.toString();
    setLocalCandidates(prev => 
      prev.map(candidate => 
        candidate.id === id 
          ? { ...candidate, contactStatus: "hired", contactedBy: userEmail }
          : candidate
      )
    );
    setSelectedCandidate(null);
    toast({
      title: "Contratação registrada",
      description: "Candidato marcado como contratado!",
      variant: "default",
    });
  };

  const handleEditProfile = () => {
    setShowMenuDropdown(false);
    setShowProfileEdit(true);
  };

  const updateProfile = (newName: string, newEmail: string) => {
    setUserName(newName);
    setUserEmail(newEmail);
    localStorage.setItem("userName", newName);
    localStorage.setItem("userEmail", newEmail);
    setShowProfileEdit(false);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Erro ao carregar candidatos</h2>
          <p className="text-muted-foreground">Tente novamente mais tarde</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">KD</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Kauan Debique</h1>
                <p className="text-sm text-muted-foreground">DBSTYLE</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 relative">
              <Button onClick={() => navigate("/vagas")}>
                <Briefcase className="w-4 h-4 mr-2" />
                Vagas
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowMenuDropdown(!showMenuDropdown)}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
                
                {showMenuDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <button
                        onClick={handleEditProfile}
                        className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted w-full"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar Perfil
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted w-full"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Candidatos
          </h2>
          <p className="text-muted-foreground">
            Visualize e acompanhe os candidatos interessados nas suas vagas
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-card rounded-lg border">
          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filtrar por:</span>
            </div>
            
            <Select value={areaFilter} onValueChange={setAreaFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Não tenho preferência" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="all-areas">Todas as áreas</SelectItem>
                <SelectItem value="Administrativo">Administrativo</SelectItem>
                <SelectItem value="Tecnologia da Informação">Tecnologia da Informação</SelectItem>
                <SelectItem value="Comercial/Vendas">Comercial/Vendas</SelectItem>
                <SelectItem value="Logística">Logística</SelectItem>
                <SelectItem value="Saúde">Saúde</SelectItem>
                <SelectItem value="Educação">Educação</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Situação" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="all-situations">Todas as situações</SelectItem>
                <SelectItem value="Desempregado">Desempregado</SelectItem>
                <SelectItem value="Primeiro emprego">Primeiro emprego</SelectItem>
                <SelectItem value="Empregado insatisfeito">Empregado insatisfeito</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={showFavorites ? "default" : "outline"}
              onClick={() => setShowFavorites(!showFavorites)}
              className="flex items-center gap-2"
            >
              <Star className={`w-4 h-4 ${showFavorites ? 'fill-current' : ''}`} />
              Favoritos
            </Button>

            <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Limpar filtros
            </Button>

            <Button>
              Aplicar filtros
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar candidatos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCandidates.map((candidate) => (
            <Card 
              key={candidate.id} 
              className={`cursor-pointer hover:shadow-lg transition-shadow relative ${
                candidate.contactStatus === "contacted" ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setSelectedCandidate(candidate)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-foreground">{candidate.name}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(candidate.id);
                    }}
                  >
                    <Star className={`w-4 h-4 ${candidate.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                  </Button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>{candidate.area}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{candidate.email}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={`${getStatusBadgeColor(candidate.status)} border`}>
                    {candidate.status}
                  </Badge>
                  {candidate.contactStatus === "contacted" && (
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 border">
                      Empresa interessada
                    </Badge>
                  )}
                </div>

                <div className="text-xs text-muted-foreground">
                  Cadastrado em {candidate.registerDate}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Anterior
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Próximo
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Candidate Details Modal */}
      {selectedCandidate && (
        <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="bg-primary text-primary-foreground p-4 -m-6 mb-6 rounded-t-lg">
              <DialogTitle className="text-xl font-bold">Detalhes do Candidato</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Informações Pessoais</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-foreground">Nome completo:</span>
                    <p className="text-muted-foreground">{selectedCandidate.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">E-mail:</span>
                    <p className="text-muted-foreground">{selectedCandidate.email}</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Telefone:</span>
                    <p className="text-muted-foreground">{selectedCandidate.phone}</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Cidade:</span>
                    <p className="text-muted-foreground">{selectedCandidate.city}</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Situação atual:</span>
                    <Badge className={`${getStatusBadgeColor(selectedCandidate.status)} border ml-2`}>
                      {selectedCandidate.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Informações Profissionais</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-foreground">Área de interesse:</span>
                    <p className="text-muted-foreground">{selectedCandidate.area}</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Resumo de experiência:</span>
                    <p className="text-muted-foreground leading-relaxed">{selectedCandidate.experience}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Currículo</h3>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PDF</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{selectedCandidate.curriculumUrl}</p>
                    <p className="text-sm text-muted-foreground">PDF – 1.2 MB</p>
                  </div>
                </div>
                <Button className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button 
                onClick={() => handleContactCandidate(selectedCandidate.id)}
                className="flex items-center gap-2"
                variant="outline"
              >
                <CheckCircle className="w-4 h-4" />
                Entrei em contato
              </Button>
              <Button 
                onClick={() => handleHireCandidate(selectedCandidate.id)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
              >
                <UserCheck className="w-4 h-4" />
                Contratei
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Profile Edit Modal */}
      {showProfileEdit && (
        <Dialog open={showProfileEdit} onOpenChange={() => setShowProfileEdit(false)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Perfil</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const newName = formData.get("name") as string;
              const newEmail = formData.get("email") as string;
              updateProfile(newName, newEmail);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Nome</label>
                  <Input 
                    name="name"
                    defaultValue={userName}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input 
                    name="email"
                    type="email"
                    defaultValue={userEmail}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowProfileEdit(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Salvar
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DashboardPage;