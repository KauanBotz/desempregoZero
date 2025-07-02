import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Desemprego Zero</h3>
            <p className="text-background/80 mb-4 max-w-md">
              Uma iniciativa da Minha Igreja na Cidade que conecta pessoas a oportunidades 
              de trabalho digno, transformando vidas através do emprego.
            </p>
            <div className="text-background/60 text-sm">
              © 2024 Desemprego Zero. Todos os direitos reservados.
            </div>
          </div>

          {/* Links Úteis */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/como-funciona" 
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link 
                  to="/depoimentos" 
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
              <p>📧 contato@desempregozero.com</p>
              <p>📱 (11) 9999-9999</p>
              <p>📍 São Paulo, SP</p>
            </div>
            
            <div className="mt-6">
              <h5 className="font-semibold mb-2">Siga-nos</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60 text-sm">
          <p>Desenvolvido com ❤️ para transformar vidas através do trabalho digno</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;