import { Zap, Target, Gem } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 text-foreground">
            Uma Iniciativa da Minha Igreja na Cidade
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground mb-6 lg:mb-8 leading-relaxed">
            O projeto Desemprego Zero é uma iniciativa social que visa conectar pessoas 
            em busca de oportunidades de trabalho com empresas parceiras que acreditam 
            no poder transformador do emprego digno.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8 lg:mt-12">
            <div className="text-center group">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 lg:w-7 lg:h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2 text-foreground">Conexão</h3>
              <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                Conectamos pessoas e empresas de forma eficiente e humana
              </p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 lg:w-7 lg:h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2 text-foreground">Propósito</h3>
              <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                Acreditamos que o trabalho dignifica e transforma vidas
              </p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Gem className="w-6 h-6 lg:w-7 lg:h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2 text-foreground">Impacto</h3>
              <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                Geramos impacto positivo em toda a comunidade
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;