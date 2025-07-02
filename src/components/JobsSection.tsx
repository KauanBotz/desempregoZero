import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { employmentAPI } from "@/lib/api";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
}

const JobsSection = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Simulação de dados enquanto backend não está pronto
        setJobs([
          {
            id: "1",
            title: "Assistente Administrativo",
            company: "Empresa ABC Ltda",
            location: "Centro",
            type: "CLT",
            salary: "R$ 1.800,00",
            description: "Responsável por atividades administrativas gerais, atendimento ao cliente e organização de documentos."
          },
          {
            id: "2",
            title: "Vendedor",
            company: "Loja XYZ",
            location: "Shopping Center",
            type: "CLT",
            salary: "R$ 1.500,00 + comissões",
            description: "Atendimento ao cliente, vendas e metas. Experiência em vendas será um diferencial."
          },
          {
            id: "3",
            title: "Operador de Caixa",
            company: "Supermercado 123",
            location: "Bairro Norte",
            type: "CLT",
            salary: "R$ 1.400,00",
            description: "Operação de caixa, atendimento ao cliente e organização do setor."
          }
        ]);
      } catch (error) {
        console.error('Erro ao carregar vagas:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId: string) => {
    // Redirecionar para página de candidatura ou abrir modal
    console.log('Candidatar-se à vaga:', jobId);
  };

  return (
    <section className="py-16 bg-stats-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Vagas em Destaque
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Confira algumas das oportunidades disponíveis agora mesmo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {jobs.map((job) => (
            <div key={job.id} className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-2 text-foreground">{job.title}</h3>
              <p className="text-primary font-medium mb-1">{job.company}</p>
              <p className="text-sm text-muted-foreground mb-1">📍 {job.location}</p>
              <p className="text-sm text-muted-foreground mb-2">💼 {job.type}</p>
              {job.salary && (
                <p className="text-sm font-medium text-success mb-3">💰 {job.salary}</p>
              )}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{job.description}</p>
              <Button 
                onClick={() => handleApply(job.id)}
                className="w-full"
                size="sm"
              >
                Candidatar-se
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            Ver Todas as Vagas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;