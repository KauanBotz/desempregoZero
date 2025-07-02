import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-hero-bg text-hero-text overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium text-white">
                Uma iniciativa da Minha Igreja na Cidade
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Desemprego Zero
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-lg">
              Transformando vidas através do trabalho digno em nossa cidade.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                variant="hero"
                className="px-8"
                onClick={() => navigate("/cadastre-se")}
              >
                Quero uma oportunidade
              </Button>
              <Button 
                size="lg" 
                variant="outline-white"
                className="font-semibold px-8"
                onClick={() => navigate("/contato")}
              >
                Seja um parceiro
              </Button>
            </div>
          </div>

          {/* Right Content - Simplified geometric illustration */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              {/* Main rounded rectangle */}
              <div className="w-80 h-96 md:w-96 md:h-[420px] bg-white/20 backdrop-blur-sm rounded-2xl flex flex-col justify-center items-center p-8">
                {/* Header circle */}
                <div className="w-20 h-20 bg-white/30 rounded-full mb-6"></div>
                
                {/* Content bars */}
                <div className="space-y-4 w-full">
                  <div className="w-full h-8 bg-white/30 rounded-lg"></div>
                  <div className="w-full h-8 bg-white/30 rounded-lg"></div>
                  <div className="w-3/4 h-6 bg-white/30 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;