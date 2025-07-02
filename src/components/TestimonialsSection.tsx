import { useEffect, useState } from "react";
import { employmentAPI } from "@/lib/api";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  photo?: string;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Simulação de dados enquanto backend não está pronto
        setTestimonials([
          {
            id: "1",
            name: "Maria Silva",
            role: "Assistente Administrativa",
            company: "Empresa ABC",
            message: "Através do Desemprego Zero consegui uma oportunidade incrível. Hoje tenho estabilidade e posso sustentar minha família.",
            photo: "https://images.unsplash.com/photo-1494790108755-2616b612b691?w=150&h=150&fit=crop&crop=face"
          },
          {
            id: "2",
            name: "João Santos",
            role: "Operador de Máquinas",
            company: "Indústria XYZ",
            message: "Estava desempregado há 8 meses. Em apenas 2 semanas após me cadastrar, já estava trabalhando novamente!",
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          },
          {
            id: "3",
            name: "Ana Costa",
            role: "Vendedora",
            company: "Loja 123",
            message: "O projeto me deu uma segunda chance. Hoje sou líder de vendas e exemplo para outras pessoas.",
            photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
          }
        ]);
      } catch (error) {
        console.error('Erro ao carregar depoimentos:', error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Histórias de Sucesso
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja como o Desemprego Zero transformou a vida de pessoas da nossa comunidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.photo || '/placeholder.svg'} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">"{testimonial.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;