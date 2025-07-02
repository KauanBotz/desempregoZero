import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/candidatos");
  };

  return (
    <>
      <header className="w-full bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-primary">
              Desemprego Zero | Minha Igreja na Cidade
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/igreja" 
                className="text-foreground hover:text-primary transition-colors"
              >
                Minha Igreja na Cidade
              </Link>
              <Link 
                to="/como-funciona" 
                className="text-foreground hover:text-primary transition-colors"
              >
                Como Funciona
              </Link>
              <Link 
                to="/depoimentos" 
                className="text-foreground hover:text-primary transition-colors"
              >
                Depoimentos
              </Link>
              <Link 
                to="/cadastre-se" 
                className="text-foreground hover:text-primary transition-colors"
              >
                Cadastre-se
              </Link>
              <Link 
                to="/contato" 
                className="text-foreground hover:text-primary transition-colors"
              >
                Contato
              </Link>
            </div>

            {/* CTA Button */}
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary-light text-primary-foreground"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Acessar
            </Button>
          </nav>
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Header;