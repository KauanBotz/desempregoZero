import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-hero-bg text-hero-text">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para Transformar sua Vida?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Não perca mais tempo! Cadastre-se agora e encontre a oportunidade que você estava esperando.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              variant="hero"
              className="px-8 py-4 text-lg"
            >
              Quero me Cadastrar
            </Button>
            <Button 
              size="lg" 
              variant="outline-white"
              className="px-8 py-4 text-lg"
            >
              Sou uma Empresa
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-white/90">Gratuito</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">24h</div>
              <div className="text-white/90">Resposta Rápida</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">+500</div>
              <div className="text-white/90">Vagas Disponíveis</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;