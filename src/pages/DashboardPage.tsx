import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Building2, 
  Briefcase, 
  TrendingUp, 
  Calendar,
  MapPin,
  Clock,
  LogOut,
  User,
  Settings
} from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState("");

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

  const stats = [
    { title: "Pessoas Cadastradas", value: "1,247", icon: Users, color: "text-blue-600" },
    { title: "Empresas Parceiras", value: "89", icon: Building2, color: "text-green-600" },
    { title: "Vagas Ativas", value: "156", icon: Briefcase, color: "text-orange-600" },
    { title: "Contratações", value: "523", icon: TrendingUp, color: "text-purple-600" },
  ];

  const recentActivities = [
    { 
      id: 1, 
      action: "Nova vaga cadastrada", 
      company: "Tech Solutions Ltda", 
      time: "2 horas atrás",
      type: "vaga"
    },
    { 
      id: 2, 
      action: "Candidato contratado", 
      company: "Maria Silva - Empresa ABC", 
      time: "4 horas atrás",
      type: "contratacao"
    },
    { 
      id: 3, 
      action: "Nova empresa parceira", 
      company: "Inovação Digital", 
      time: "1 dia atrás",
      type: "empresa"
    },
    { 
      id: 4, 
      action: "Candidato cadastrado", 
      company: "João Santos", 
      time: "2 dias atrás",
      type: "candidato"
    },
  ];

  const urgentJobs = [
    {
      id: 1,
      title: "Desenvolvedor Full Stack",
      company: "Tech Inovação",
      location: "São Paulo, SP",
      salary: "R$ 8.000",
      applicants: 23,
      daysLeft: 3
    },
    {
      id: 2,
      title: "Assistente Administrativo",
      company: "Empresa Global",
      location: "Belo Horizonte, MG",
      salary: "R$ 2.500",
      applicants: 45,
      daysLeft: 5
    },
    {
      id: 3,
      title: "Vendedor Externo",
      company: "Vendas Plus",
      location: "Rio de Janeiro, RJ",
      salary: "R$ 3.200",
      applicants: 12,
      daysLeft: 7
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">Desemprego Zero</h1>
              <Badge variant="secondary">Dashboard</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{userEmail}</span>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo ao Dashboard
          </h2>
          <p className="text-muted-foreground">
            Gerencie candidatos, vagas e empresas parceiras do projeto Desemprego Zero
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Atividades Recentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'vaga' ? 'bg-orange-500' :
                      activity.type === 'contratacao' ? 'bg-green-500' :
                      activity.type === 'empresa' ? 'bg-blue-500' : 'bg-purple-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.company}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Urgent Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>Vagas Urgentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {urgentJobs.map((job) => (
                  <div key={job.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{job.title}</h3>
                      <Badge variant={job.daysLeft <= 3 ? "destructive" : "secondary"}>
                        {job.daysLeft} dias
                      </Badge>
                    </div>
                    <p className="text-sm text-primary font-medium mb-1">{job.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{job.location}</span>
                      </div>
                      <span className="font-medium">{job.salary}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {job.applicants} candidatos
                      </span>
                      <Button size="sm" variant="outline">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="p-6 h-auto flex-col space-y-2">
                <Users className="w-6 h-6" />
                <span>Gerenciar Candidatos</span>
              </Button>
              <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
                <Briefcase className="w-6 h-6" />
                <span>Cadastrar Vaga</span>
              </Button>
              <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
                <Building2 className="w-6 h-6" />
                <span>Nova Empresa</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;