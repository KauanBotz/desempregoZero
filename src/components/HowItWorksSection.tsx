const HowItWorksSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center bg-primary/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <span className="text-sm font-medium text-primary">Processo Simplificado</span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Como Funciona
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Um processo simples e eficiente para conectar você à sua próxima oportunidade
          </p>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Connecting lines for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {/* Passo 1 */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-card/80 to-card backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-[0_20px_80px_-20px_hsl(var(--primary)/0.15)] hover:shadow-[0_32px_120px_-20px_hsl(var(--primary)/0.25)] transition-all duration-700 border border-border/50 hover:border-primary/30 text-center transform hover:-translate-y-2">
                
                {/* Step indicator */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <span className="text-2xl lg:text-3xl font-bold text-primary-foreground">1</span>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/30 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary/20 rounded-full animate-pulse delay-300"></div>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">Cadastre-se</h3>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                  Preencha o formulário com seus dados pessoais e profissionais para começarmos a buscar oportunidades para você.
                </p>
                
                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-card/80 to-card backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-[0_20px_80px_-20px_hsl(var(--primary)/0.15)] hover:shadow-[0_32px_120px_-20px_hsl(var(--primary)/0.25)] transition-all duration-700 border border-border/50 hover:border-primary/30 text-center transform hover:-translate-y-2">
                
                {/* Step indicator */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <span className="text-2xl lg:text-3xl font-bold text-primary-foreground">2</span>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/30 rounded-full animate-pulse delay-150"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary/20 rounded-full animate-pulse delay-450"></div>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">Receba Oportunidades</h3>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                  Nossa equipe da Minha Igreja na Cidade irá analisar seu perfil e conectá-lo com as melhores oportunidades disponíveis em nossa rede.
                </p>
                
                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-card/80 to-card backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-[0_20px_80px_-20px_hsl(var(--primary)/0.15)] hover:shadow-[0_32px_120px_-20px_hsl(var(--primary)/0.25)] transition-all duration-700 border border-border/50 hover:border-primary/30 text-center transform hover:-translate-y-2">
                
                {/* Step indicator */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <span className="text-2xl lg:text-3xl font-bold text-primary-foreground">3</span>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/30 rounded-full animate-pulse delay-300"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary/20 rounded-full animate-pulse delay-600"></div>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">Conquiste sua Vaga</h3>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                  Receba orientação para entrevistas e acompanhamento até a contratação e durante o período de adaptação.
                </p>
                
                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;