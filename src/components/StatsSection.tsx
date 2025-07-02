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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pessoas Empregadas */}
          <div className="text-center bg-stats-bg rounded-2xl p-8">
            <div className="text-6xl font-bold text-stats-text mb-4">
              {stats.peopleEmployed}
            </div>
            <p className="text-lg font-medium text-foreground">
              Pessoas empregadas
            </p>
          </div>

          {/* Empresas Parceiras */}
          <div className="text-center bg-stats-bg rounded-2xl p-8">
            <div className="text-6xl font-bold text-stats-text mb-4">
              {stats.partnerCompanies}
            </div>
            <p className="text-lg font-medium text-foreground">
              Empresas parceiras
            </p>
          </div>

          {/* Taxa de Satisfação */}
          <div className="text-center bg-stats-bg rounded-2xl p-8">
            <div className="text-6xl font-bold text-stats-text mb-4">
              {stats.satisfactionRate}
            </div>
            <p className="text-lg font-medium text-foreground">
              Taxa de satisfação (%)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;