import { useEffect, useState } from "react";
import { employmentAPI } from "@/lib/api";

interface Stats {
  peopleEmployed: number;
  partnerCompanies: number;
  satisfactionRate: number;
}

const StatsSection = () => {
  const [stats, setStats] = useState<Stats>({
    peopleEmployed: 0,
    partnerCompanies: 0,
    satisfactionRate: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await employmentAPI.getStats();
        setStats(data);
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
        // Valores de fallback para demonstração
        setStats({
          peopleEmployed: 0,
          partnerCompanies: 0,
          satisfactionRate: 0
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-center max-w-5xl mx-auto">
          <div className="bg-card rounded-xl p-6 shadow-[0_12px_48px_-12px_hsl(var(--muted-foreground)/0.15)] hover:shadow-[0_16px_60px_-12px_hsl(var(--muted-foreground)/0.2)] transition-all duration-300">
            <div className="text-4xl lg:text-5xl font-bold text-stats-text mb-2">0</div>
            <div className="text-muted-foreground font-medium text-sm lg:text-base">Pessoas empregadas</div>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-[0_12px_48px_-12px_hsl(var(--muted-foreground)/0.15)] hover:shadow-[0_16px_60px_-12px_hsl(var(--muted-foreground)/0.2)] transition-all duration-300">
            <div className="text-4xl lg:text-5xl font-bold text-stats-text mb-2">0</div>
            <div className="text-muted-foreground font-medium text-sm lg:text-base">Empresas parceiras</div>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-[0_12px_48px_-12px_hsl(var(--muted-foreground)/0.15)] hover:shadow-[0_16px_60px_-12px_hsl(var(--muted-foreground)/0.2)] transition-all duration-300">
            <div className="text-4xl lg:text-5xl font-bold text-stats-text mb-2">0</div>
            <div className="text-muted-foreground font-medium text-sm lg:text-base">Taxa de satisfação (%)</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;