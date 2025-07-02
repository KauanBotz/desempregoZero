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
        fullError: error
      });
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          `Erro ${error.response?.status}: ${error.response?.statusText}` ||
                          "Credenciais inválidas";
      
      toast({
        title: "Erro no login",
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