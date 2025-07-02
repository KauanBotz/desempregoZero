const AboutSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Uma Iniciativa da Minha Igreja na Cidade
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            O projeto Desemprego Zero é uma iniciativa social que visa conectar pessoas 
            em busca de oportunidades de trabalho com empresas parceiras que acreditam 
            no poder transformador do emprego digno.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-foreground">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Conexão</h3>
              <p className="text-muted-foreground">
                Conectamos pessoas e empresas de forma eficiente e humana
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-foreground">❤️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Propósito</h3>
              <p className="text-muted-foreground">
                Acreditamos que o trabalho dignifica e transforma vidas
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-foreground">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Impacto</h3>
              <p className="text-muted-foreground">
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