const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-stats-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 text-foreground">
            Como Funciona
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Um processo simples e eficiente para conectar você à sua próxima oportunidade
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Passo 1 */}
          <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl p-6 lg:p-8 shadow-[0_12px_48px_-12px_hsl(var(--primary)/0.15)] hover:shadow-[0_20px_64px_-12px_hsl(var(--primary)/0.25)] transition-all duration-500 border border-border/50 text-center group">
            <div className="relative mb-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl lg:text-2xl font-bold text-primary-foreground">1</span>
              </div>
            </div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4 text-foreground">Cadastre-se</h3>
            <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
              Crie seu perfil com suas informações pessoais, experiências e áreas de interesse
            </p>
          </div>

          {/* Passo 2 */}
          <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl p-6 lg:p-8 shadow-[0_12px_48px_-12px_hsl(var(--primary)/0.15)] hover:shadow-[0_20px_64px_-12px_hsl(var(--primary)/0.25)] transition-all duration-500 border border-border/50 text-center group">
            <div className="relative mb-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl lg:text-2xl font-bold text-primary-foreground">2</span>
              </div>
            </div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4 text-foreground">Encontre Vagas</h3>
            <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
              Navegue pelas oportunidades disponíveis e candidate-se às que mais combinam com você
            </p>
          </div>

          {/* Passo 3 */}
          <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl p-6 lg:p-8 shadow-[0_12px_48px_-12px_hsl(var(--primary)/0.15)] hover:shadow-[0_20px_64px_-12px_hsl(var(--primary)/0.25)] transition-all duration-500 border border-border/50 text-center group">
            <div className="relative mb-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl lg:text-2xl font-bold text-primary-foreground">3</span>
              </div>
            </div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4 text-foreground">Seja Contratado</h3>
            <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
              Receba o contato das empresas e inicie sua jornada profissional
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;