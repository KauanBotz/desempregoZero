import { useMutation } from "@tanstack/react-query";
import { employmentAPI } from "@/lib/api";
import { LoginResponse } from "@/types/api";
import { useToast } from "@/hooks/use-toast";

export const useLogin = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      employmentAPI.login(email, password),
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", data.admin.email);
      localStorage.setItem("userName", data.admin.username);
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${data.admin.username}!`,
      });
    },
    onError: (error: any) => {
      console.log("Login error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        code: error.code,
        isNetworkError: !error.response,
        fullError: error
      });
      
      let errorTitle = "Erro no login";
      let errorMessage = "Erro desconhecido";
      
      // Network Error (API não disponível)
      if (!error.response) {
        if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
          errorTitle = "Erro de Conexão";
          errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.";
        } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          errorTitle = "Timeout";
          errorMessage = "A conexão demorou muito para responder. Tente novamente.";
        } else {
          errorTitle = "Servidor Indisponível";
          errorMessage = "O servidor não está respondendo no momento. Tente novamente em alguns minutos.";
        }
      }
      // HTTP Error Response
      else if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 401) {
          errorMessage = data?.message || "Credenciais inválidas";
        } else if (status === 400) {
          errorMessage = data?.message || "Dados de login inválidos";
        } else if (status === 500) {
          errorTitle = "Erro no Servidor";
          errorMessage = "Erro interno do servidor. Tente novamente mais tarde.";
        } else if (status >= 500) {
          errorTitle = "Servidor Indisponível";
          errorMessage = "O servidor está com problemas. Tente novamente mais tarde.";
        } else {
          errorMessage = data?.message || data?.error || `Erro ${status}: ${error.response.statusText}`;
        }
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

export const useLogout = () => {
  const { toast } = useToast();

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  return { logout };
};