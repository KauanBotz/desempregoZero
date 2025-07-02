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
                onClick={() => navigate("/parceiros")}
              >
                Seja um parceiro
              </Button>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              {/* Main Circle */}
              <div className="w-80 h-80 md:w-96 md:h-96 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                {/* Inner Elements */}
                <div className="space-y-4">
                  <div className="w-64 h-12 bg-white/30 rounded-lg"></div>
                  <div className="w-64 h-12 bg-white/30 rounded-lg"></div>
                  <div className="w-32 h-8 bg-white/30 rounded-lg"></div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/30 rounded-full"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;