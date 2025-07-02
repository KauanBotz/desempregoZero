import Header from "@/components/Header";

const SecondPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8 text-foreground">
            Página em Desenvolvimento
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Esta página está sendo construída para oferecer mais funcionalidades.
          </p>
          <div className="max-w-2xl mx-auto bg-card rounded-lg p-8 shadow-sm">
            <p className="text-muted-foreground">
              Em breve você encontrará aqui mais informações sobre oportunidades de emprego, 
              cadastro de empresas parceiras e muito mais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;