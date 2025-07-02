import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useJobs, useCreateJob, useUpdateJob, useDeleteJob } from "@/hooks/useJobs";
import { useLogout } from "@/hooks/useAuth";
import { CreateJobData, Job } from "@/types/api";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
  MapPin,
  DollarSign,
  Calendar,
  LogOut,
  Briefcase,
  Loader2
} from "lucide-react";

const JobsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useLogout();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const { data: jobs = [], isLoading, error } = useJobs();
  const createJobMutation = useCreateJob();
  const updateJobMutation = useUpdateJob();
  const deleteJobMutation = useDeleteJob();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const filteredJobs = jobs.filter((job: Job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || locationFilter === "all" || job.location === locationFilter;
    return matchesSearch && matchesLocation && job.active;
  });

  const handleCreateJob = (jobData: CreateJobData) => {
    createJobMutation.mutate(jobData, {
      onSuccess: () => {
        setShowCreateModal(false);
      }
    });
  };

  const handleUpdateJob = (jobData: Partial<CreateJobData>) => {
    if (editingJob) {
      updateJobMutation.mutate(
        { jobId: editingJob.id.toString(), jobData },
        {
          onSuccess: () => {
            setEditingJob(null);
          }
        }
      );
    }
  };

  const handleDeleteJob = (jobId: number) => {
    if (confirm("Tem certeza que deseja excluir esta vaga?")) {
      deleteJobMutation.mutate(jobId.toString(), {
        onSuccess: () => {
          setSelectedJob(null);
        }
      });
    }
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
          <h2 className="text-2xl font-bold mb-2">Erro ao carregar vagas</h2>
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
                <Briefcase className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Gestão de Vagas</h1>
                <p className="text-sm text-muted-foreground">Desemprego Zero</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button onClick={() => navigate("/candidatos")}>
                <Users className="w-4 h-4 mr-2" />
                Candidatos
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title and Actions */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Vagas de Emprego
            </h2>
            <p className="text-muted-foreground">
              Gerencie as vagas disponíveis na plataforma
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Vaga
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-card rounded-lg border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por título ou empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Localização" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as localizações</SelectItem>
              <SelectItem value="Remoto">Remoto</SelectItem>
              <SelectItem value="São Paulo">São Paulo</SelectItem>
              <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job: Job) => (
            <Card 
              key={job.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedJob(job)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingJob(job);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteJob(job.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium text-foreground">{job.company}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{job.candidates?.length || 0} candidatos</span>
                  </div>
                  <Badge className="mt-2">{job.type}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma vaga encontrada</h3>
            <p className="text-muted-foreground">
              {searchTerm || locationFilter 
                ? "Tente ajustar os filtros de busca"
                : "Comece criando sua primeira vaga"
              }
            </p>
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Empresa</h3>
                  <p>{selectedJob.company}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Localização</h3>
                  <p>{selectedJob.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Salário</h3>
                  <p>{selectedJob.salary}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tipo</h3>
                  <p>{selectedJob.type}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Descrição</h3>
                <p className="text-muted-foreground">{selectedJob.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Requisitos</h3>
                <p className="text-muted-foreground">{selectedJob.requirements}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Candidatos ({selectedJob.candidates?.length || 0})</h3>
                {selectedJob.candidates && selectedJob.candidates.length > 0 ? (
                  <div className="space-y-2">
                    {selectedJob.candidates.map((candidate) => (
                      <div key={candidate.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{candidate.name}</p>
                            <p className="text-sm text-muted-foreground">{candidate.email}</p>
                          </div>
                          <Badge variant="outline">Candidato</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Nenhum candidato ainda</p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Job Modal */}
      <JobFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateJob}
        isLoading={createJobMutation.isPending}
        title="Criar Nova Vaga"
      />

      {/* Edit Job Modal */}
      <JobFormModal
        isOpen={!!editingJob}
        onClose={() => setEditingJob(null)}
        onSubmit={handleUpdateJob}
        initialData={editingJob}
        isLoading={updateJobMutation.isPending}
        title="Editar Vaga"
      />
    </div>
  );
};

// Job Form Modal Component
interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateJobData) => void;
  initialData?: Job | null;
  isLoading: boolean;
  title: string;
}

const JobFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading, title }: JobFormModalProps) => {
  const [formData, setFormData] = useState<CreateJobData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    company: initialData?.company || "",
    location: initialData?.location || "",
    salary: initialData?.salary || "",
    type: initialData?.type || "",
    requirements: initialData?.requirements || "",
    deadline: initialData?.deadline ? initialData.deadline.split('T')[0] : "",
    active: initialData?.active ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Título da Vaga</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Empresa</label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Localização</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Salário</label>
              <Input
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="R$ 5.000,00"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Tipo</label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Tempo Integral</SelectItem>
                  <SelectItem value="Part-time">Meio Período</SelectItem>
                  <SelectItem value="Contract">Contrato</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Prazo</label>
              <Input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              className="w-full p-3 border border-border rounded-md resize-none h-24"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Requisitos</label>
            <textarea
              className="w-full p-3 border border-border rounded-md resize-none h-24"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              required
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobsPage;