import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { employmentAPI } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CadastroPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    currentSituation: "",
    areaOfInterest: "",
    experience: "",
    resume: null as File | null,
    acceptTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 5MB",
        variant: "destructive"
      });
      return;
    }
    handleInputChange("resume", file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast({
        title: "Termos de uso",
        description: "Você deve aceitar os termos de uso para continuar",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const candidateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        education: `Cidade: ${formData.city}`,
        experience: `${formData.experience} - Área de interesse: ${formData.areaOfInterest} - Situação atual: ${formData.currentSituation}`,
        resume: formData.resume ? `Arquivo enviado: ${formData.resume.name}` : "Não enviado"
      };

      await employmentAPI.registerCandidate(candidateData);
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Entraremos em contato em breve com oportunidades adequadas ao seu perfil.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        currentSituation: "",
        areaOfInterest: "",
        experience: "",
        resume: null,
        acceptTerms: false
      });

    } catch (error) {
      toast({
        title: "Erro ao realizar cadastro",
        description: "Tente novamente mais tarde ou entre em contato conosco.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">
                Cadastre-se
              </CardTitle>
              <CardDescription className="text-lg">
                Preencha o formulário abaixo para começar sua jornada rumo a uma nova oportunidade profissional.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Cidade *</Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                    placeholder="Digite sua cidade"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Situação Atual *</Label>
                    <Select onValueChange={(value) => handleInputChange("currentSituation", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione sua situação" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desempregado">Desempregado</SelectItem>
                        <SelectItem value="empregado">Empregado</SelectItem>
                        <SelectItem value="autonomo">Autônomo</SelectItem>
                        <SelectItem value="estudante">Estudante</SelectItem>
                        <SelectItem value="primeiro-emprego">Primeiro Emprego</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Área de Interesse *</Label>
                    <Select onValueChange={(value) => handleInputChange("areaOfInterest", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma área" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administrativo">Administrativo</SelectItem>
                        <SelectItem value="vendas">Vendas</SelectItem>
                        <SelectItem value="atendimento">Atendimento ao Cliente</SelectItem>
                        <SelectItem value="tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="educacao">Educação</SelectItem>
                        <SelectItem value="saude">Saúde</SelectItem>
                        <SelectItem value="operacional">Operacional</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Resumo da Experiência Profissional *</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    required
                    placeholder="Descreva brevemente sua experiência profissional, cursos e habilidades..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Anexar Currículo</Label>
                  <div className="border-2 border-dashed border-input rounded-lg p-6 text-center">
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm">
                        {formData.resume ? formData.resume.name : "Selecione um arquivo"}
                      </span>
                      <Button type="button" variant="outline" size="sm">
                        Procurar
                      </Button>
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Formatos aceitos: PDF, DOC ou DOCX (máx. 5MB)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    Concordo com os termos de uso e política de privacidade
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "ENVIAR CADASTRO"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CadastroPage;