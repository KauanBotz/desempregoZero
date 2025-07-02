import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employmentAPI } from "@/lib/api";
import { Candidate, CreateCandidateData } from "@/types/api";
import { useToast } from "@/hooks/use-toast";

export const useCandidates = () => {
  return useQuery({
    queryKey: ["candidates"],
    queryFn: employmentAPI.getCandidates,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateCandidate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (candidateData: CreateCandidateData) =>
      employmentAPI.registerCandidate(candidateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      toast({
        title: "Candidato cadastrado!",
        description: "Candidato registrado com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao cadastrar",
        description: error.response?.data?.message || "Erro interno do servidor",
        variant: "destructive",
      });
    },
  });
};