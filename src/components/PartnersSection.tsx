import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { employmentAPI } from "@/lib/api";

interface Partner {
  id: string;
  name: string;
  logo?: string;
  description: string;
}

const PartnersSection = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        // Simulação de dados enquanto backend não está pronto
        setPartners([
          {
            id: "1",
            name: "Empresa ABC Ltda",
            description: "Líder em soluções administrativas"
          },
          {
            id: "2",
            name: "Indústria XYZ",
            description: "Manufatura e produção industrial"
          },
          {
            id: "3",
            name: "Comércio 123",
            description: "Varejo e atendimento ao cliente"
          },
          {
            id: "4",
            name: "Serviços Pro",
            description: "Prestação de serviços especializados"
          },
          {
            id: "5",
            name: "Tech Solutions",
            description: "Tecnologia e inovação"
          },
          {
            id: "6",
            name: "Logística Total",
            description: "Transporte e distribuição"
          }
        ]);
      } catch (error) {
        console.error('Erro ao carregar parceiros:', error);
      }
    };

    fetchPartners();
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Empresas Parceiras
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça as empresas que acreditam no nosso projeto e oferecem oportunidades
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto mb-12">
          {partners.map((partner) => (
            <div key={partner.id} className="text-center group">
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-stats-bg rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-stats-text">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1">{partner.name}</h3>
                <p className="text-xs text-muted-foreground">{partner.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-card rounded-lg p-8 shadow-sm border border-border max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Seja Nosso Parceiro</h3>
          <p className="text-muted-foreground mb-6">
            Sua empresa pode fazer parte desta iniciativa social e ajudar a transformar vidas 
            através do trabalho digno. Junte-se a nós nesta missão!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Quero ser Parceiro
            </Button>
            <Button size="lg" variant="outline">
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;