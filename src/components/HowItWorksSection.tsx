const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-stats-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Como Funciona
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Um processo simples e eficiente para conectar você à sua próxima oportunidade
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Passo 1 */}
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold text-primary-foreground">1</span>
              </div>
              <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-primary/30 -translate-y-1/2"></div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Cadastre-se</h3>
            <p className="text-muted-foreground">
              Crie seu perfil com suas informações pessoais, experiências e áreas de interesse
            </p>
          </div>

          {/* Passo 2 */}
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold text-primary-foreground">2</span>
              </div>
              <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-primary/30 -translate-y-1/2"></div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Encontre Vagas</h3>
            <p className="text-muted-foreground">
              Navegue pelas oportunidades disponíveis e candidate-se às que mais combinam com você
            </p>
          </div>

          {/* Passo 3 */}
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold text-primary-foreground">3</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Seja Contratado</h3>
            <p className="text-muted-foreground">
              Receba o contato das empresas e inicie sua jornada profissional
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;