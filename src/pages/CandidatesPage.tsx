import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Star, MapPin, Briefcase, Mail } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  email: string;
  area: string;
  status: "Desempregado" | "Primeiro emprego" | "Empregado insatisfeito";
  registeredAt: string;
  isFavorite: boolean;
  photo?: string;
}

const CandidatesPage = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterArea, setFilterArea] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    // Simulação dos dados dos candidatos baseado na imagem
    setCandidates([
      {
        id: "1",
        name: "Maria Silva",
        email: "maria.silva@email.com",
        area: "Administrativo",
        status: "Desempregado",
        registeredAt: "15/05/2025",
        isFavorite: false,
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b691?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: "2",
        name: "João Oliveira",
        email: "joao.oliveira@email.com",
        area: "Tecnologia da Informação",
        status: "Primeiro emprego",
        registeredAt: "20/05/2025",
        isFavorite: false,
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: "3",
        name: "Ana Souza",
        email: "ana.souza@email.com",
        area: "Comercial/Vendas",
        status: "Empregado insatisfeito",
        registeredAt: "18/05/2025",
        isFavorite: true,
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: "4",
        name: "Carlos Mendes",
        email: "carlos.mendes@email.com",
        area: "Logística",
        status: "Desempregado",
        registeredAt: "22/05/2025",
        isFavorite: false,
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: "5",
        name: "Juliana Costa",
        email: "juliana.costa@email.com",
        area: "Saúde",
        status: "Empregado insatisfeito",
        registeredAt: "25/05/2025",
        isFavorite: false,
        photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: "6",
        name: "Pedro Santos",
        email: "pedro.santos@email.com",
        area: "Educação",
        status: "Primeiro emprego",
        registeredAt: "28/05/2025",
        isFavorite: true,
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Desempregado":
        return "destructive";
      case "Primeiro emprego":
        return "default";
      case "Empregado insatisfeito":
        return "secondary";
      default:
        return "default";
    }
  };

  const toggleFavorite = (candidateId: string) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, isFavorite: !candidate.isFavorite }
        : candidate
    ));
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = !filterArea || candidate.area === filterArea;
    const matchesStatus = !filterStatus || candidate.status === filterStatus;
    const matchesFavorites = !showFavorites || candidate.isFavorite;
    
    return matchesSearch && matchesArea && matchesStatus && matchesFavorites;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Candidatos</h1>
              <p className="text-muted-foreground">Gerencie e visualize todos os candidatos cadastrados</p>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>KD</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="text-sm font-medium">Kauan Debique</p>
                <p className="text-xs text-muted-foreground">DBSTYLE</p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar candidatos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterArea} onValueChange={setFilterArea}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Não tenho preferência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as áreas</SelectItem>
                  <SelectItem value="Administrativo">Administrativo</SelectItem>
                  <SelectItem value="Tecnologia da Informação">Tecnologia da Informação</SelectItem>
                  <SelectItem value="Comercial/Vendas">Comercial/Vendas</SelectItem>
                  <SelectItem value="Logística">Logística</SelectItem>
                  <SelectItem value="Saúde">Saúde</SelectItem>
                  <SelectItem value="Educação">Educação</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Situação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as situações</SelectItem>
                  <SelectItem value="Desempregado">Desempregado</SelectItem>
                  <SelectItem value="Primeiro emprego">Primeiro emprego</SelectItem>
                  <SelectItem value="Empregado insatisfeito">Empregado insatisfeito</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={showFavorites ? "default" : "outline"}
                onClick={() => setShowFavorites(!showFavorites)}
                className="whitespace-nowrap"
              >
                <Star className="h-4 w-4 mr-2" />
                Favoritos
              </Button>

              <Button className="bg-primary hover:bg-primary-light">
                Aplicar filtros
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={candidate.photo} />
                      <AvatarFallback>
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{candidate.name}</CardTitle>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(candidate.id)}
                    className="p-1"
                  >
                    <Star 
                      className={`h-4 w-4 ${candidate.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>{candidate.area}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{candidate.email}</span>
                </div>

                <Badge variant={getStatusColor(candidate.status)} className="text-xs">
                  {candidate.status}
                </Badge>

                <div className="text-sm text-muted-foreground">
                  Cadastrado em {candidate.registeredAt}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum candidato encontrado com os filtros aplicados.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          <Button variant="outline" size="sm">Anterior</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <span className="text-muted-foreground">...</span>
          <Button variant="outline" size="sm">10</Button>
          <Button variant="outline" size="sm">Próximo</Button>
        </div>
      </div>
    </div>
  );
};

export default CandidatesPage;