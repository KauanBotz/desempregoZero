import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
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
  UserCheck
} from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  area: string;
  status: "Desempregado" | "Primeiro emprego" | "Empregado insatisfeito";
  registerDate: string;
  isFavorite: boolean;
  experience: string;
  curriculumUrl?: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "1",
      name: "Maria Silva",
      email: "maria.silva@email.com",
      phone: "(11) 98765-4321",
      city: "São Paulo, SP",
      area: "Administrativo",
      status: "Desempregado",
      registerDate: "15/05/2025",
      isFavorite: false,
      experience: "Trabalhou por 3 anos como assistente administrativa, responsável por controle de documentos, suporte à gerência e atendimento telefônico. Antes disso, foi recepcionista por 1 ano.",
      curriculumUrl: "curriculo_maria_silva.pdf"
    },
    {
      id: "2",
      name: "João Oliveira",
      email: "joao.oliveira@email.com",
      phone: "(11) 99876-5432",
      city: "São Paulo, SP",
      area: "Tecnologia da Informação",
      status: "Primeiro emprego",
      registerDate: "20/05/2025",
      isFavorite: false,
      experience: "Recém-formado em Análise e Desenvolvimento de Sistemas. Possui conhecimentos em React, Node.js e banco de dados. Realizou projetos acadêmicos e estágios.",
      curriculumUrl: "curriculo_joao_oliveira.pdf"
    },
    {
      id: "3",
      name: "Ana Souza",
      email: "ana.souza@email.com",
      phone: "(11) 95555-1234",
      city: "São Paulo, SP",
      area: "Comercial/Vendas",
      status: "Empregado insatisfeito",
      registerDate: "18/05/2025",
      isFavorite: true,
      experience: "5 anos de experiência em vendas no varejo. Especialista em atendimento ao cliente e metas de vendas. Busca novos desafios na área comercial.",
      curriculumUrl: "curriculo_ana_souza.pdf"
    },
    {
      id: "4",
      name: "Carlos Mendes",
      email: "carlos.mendes@email.com",
      phone: "(11) 94444-5678",
      city: "São Paulo, SP",
      area: "Logística",
      status: "Desempregado",
      registerDate: "22/05/2025",
      isFavorite: false,
      experience: "4 anos de experiência em logística e distribuição. Conhecimento em gestão de estoque e transporte. Certificação em operação de empilhadeira.",
      curriculumUrl: "curriculo_carlos_mendes.pdf"
    },
    {
      id: "5",
      name: "Juliana Costa",
      email: "juliana.costa@email.com",
      phone: "(11) 93333-9876",
      city: "São Paulo, SP",
      area: "Saúde",
      status: "Empregado insatisfeito",
      registerDate: "25/05/2025",
      isFavorite: false,
      experience: "Técnica em enfermagem com 6 anos de experiência. Trabalhou em hospitais e clínicas. Busca oportunidade de crescimento profissional.",
      curriculumUrl: "curriculo_juliana_costa.pdf"
    },
    {
      id: "6",
      name: "Pedro Santos",
      email: "pedro.santos@email.com",
      phone: "(11) 92222-3456",
      city: "São Paulo, SP",
      area: "Educação",
      status: "Primeiro emprego",
      registerDate: "28/05/2025",
      isFavorite: true,
      experience: "Recém-formado em Pedagogia. Possui experiência em estágios supervisionados e projetos educacionais. Busca primeira oportunidade como professor.",
      curriculumUrl: "curriculo_pedro_santos.pdf"
    },
  ]);

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
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/");
  };

  const toggleFavorite = (candidateId: string) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
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

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = !areaFilter || areaFilter === "all-areas" || candidate.area === areaFilter;
    const matchesStatus = !statusFilter || statusFilter === "all-situations" || candidate.status === statusFilter;
    const matchesFavorites = !showFavorites || candidate.isFavorite;
    
    return matchesSearch && matchesArea && matchesStatus && matchesFavorites;
  });

  const clearFilters = () => {
    setAreaFilter("all-areas");
    setStatusFilter("all-situations");
    setShowFavorites(false);
  };

  const handleContactCandidate = (candidateId: string) => {
    toast({
      title: "Contato registrado",
      description: "Marcado como 'Entrei em contato' com sucesso.",
    });
  };

  const handleHireCandidate = (candidateId: string) => {
    toast({
      title: "Contratação registrada",
      description: "Candidato marcado como contratado!",
      variant: "default",
    });
  };

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
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
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
          {filteredCandidates.map((candidate) => (
            <Card 
              key={candidate.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow relative"
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

                <div className="mb-4">
                  <Badge className={`${getStatusBadgeColor(candidate.status)} border`}>
                    {candidate.status}
                  </Badge>
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
          <Button variant="outline" size="sm">Anterior</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <span className="text-muted-foreground">...</span>
          <Button variant="outline" size="sm">10</Button>
          <Button variant="outline" size="sm">Próximo</Button>
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
    </div>
  );
};

export default DashboardPage;