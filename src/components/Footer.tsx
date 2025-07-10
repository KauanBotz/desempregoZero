import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Instagram, Youtube, Music, FacebookIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Desemprego Zero | Minha Igreja na Cidade</h3>
            <p className="text-background/80 mb-4 max-w-md">
              Uma iniciativa da Minha Igreja na Cidade que conecta pessoas a oportunidades 
              de trabalho digno, transformando vidas através do emprego.
            </p>
            <div className="text-background/60 text-sm">
              © 2025 Minha Igreja na Cidade. Todos os direitos reservados.
            </div>
          </div>

          {/* Links Úteis */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/#how-it-works"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link 
                  to="/#testimonials"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Depoimentos
                </Link>
              </li>
              <li>
                <Link 
                  to="/igreja" 
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Sobre a Igreja
                </Link>
              </li>
              <li>
                <Link 
                  to="/contato" 
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>


          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-background/80">
              <p> contato@desempregozero.com</p>
              <p> (31) 9999-9999</p>
              <p> Alameda das Latanias, 1195 <br></br> São Luiz,  Belo Horizonte - MG</p>
            </div>
            
            <div className="mt-6">
              <h5 className="font-semibold mb-2">Siga-nos</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  <FacebookIcon className="h-6 w-6" />
                </a>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  <Music className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;