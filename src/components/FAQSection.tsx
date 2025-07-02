import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Como funciona o cadastro no Desemprego Zero?",
      answer: "O cadastro é gratuito e simples. Você preenche suas informações pessoais, experiências profissionais e áreas de interesse. Nosso sistema conecta seu perfil com as vagas disponíveis."
    },
    {
      question: "Existe algum custo para usar a plataforma?",
      answer: "Não! O Desemprego Zero é uma iniciativa social completamente gratuita. Não cobramos nada dos candidatos nem das empresas parceiras."
    },
    {
      question: "Como as empresas entram em contato comigo?",
      answer: "Quando seu perfil corresponde a uma vaga, a empresa recebe seus dados de contato e entra em contato diretamente com você por telefone ou email."
    },
    {
      question: "Que tipos de vagas estão disponíveis?",
      answer: "Temos vagas em diversas áreas: administrativo, vendas, serviços, produção, logística, tecnologia e muito mais. Desde vagas de entrada até posições que exigem experiência."
    },
    {
      question: "Como posso aumentar minhas chances de ser contratado?",
      answer: "Mantenha seu perfil sempre atualizado, seja honesto sobre suas experiências, demonstre interesse e disponibilidade, e participe das capacitações que oferecemos."
    },
    {
      question: "A iniciativa está ligada a alguma religião específica?",
      answer: "Embora seja uma iniciativa da Minha Igreja na Cidade, o projeto é aberto a todas as pessoas, independente de religião, credo ou origem. Nosso foco é no aspecto social."
    }
  ];

  return (
    <section className="py-16 bg-stats-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre o projeto Desemprego Zero
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;