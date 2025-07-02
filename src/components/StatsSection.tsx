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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-card rounded-lg p-8 shadow-[0_8px_32px_-8px_hsl(var(--muted))]">
            <div className="text-6xl font-bold text-stats-text mb-2">0</div>
            <div className="text-gray-600 font-medium">Pessoas empregadas</div>
          </div>
          
          <div className="bg-card rounded-lg p-8 shadow-[0_8px_32px_-8px_hsl(var(--muted))]">
            <div className="text-6xl font-bold text-stats-text mb-2">0</div>
            <div className="text-gray-600 font-medium">Empresas parceiras</div>
          </div>
          
          <div className="bg-card rounded-lg p-8 shadow-[0_8px_32px_-8px_hsl(var(--muted))]">
            <div className="text-6xl font-bold text-stats-text mb-2">0</div>
            <div className="text-gray-600 font-medium">Taxa de satisfação (%)</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;