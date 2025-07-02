import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employmentAPI } from "@/lib/api";
import { Job, CreateJobData } from "@/types/api";
import { useToast } from "@/hooks/use-toast";

export const useJobs = (params?: { city?: string; category?: string; page?: number }) => {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: () => employmentAPI.getJobs(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useJob = (jobId: string) => {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: () => employmentAPI.getJob(jobId),
    enabled: !!jobId,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (jobData: CreateJobData) => employmentAPI.createJob(jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({
        title: "Vaga criada!",
        description: "Nova vaga de emprego criada com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar vaga",
        description: error.response?.data?.message || "Erro interno do servidor",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ jobId, jobData }: { jobId: string; jobData: Partial<CreateJobData> }) =>
      employmentAPI.updateJob(jobId, jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job"] });
      toast({
        title: "Vaga atualizada!",
        description: "Vaga de emprego atualizada com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar vaga",
        description: error.response?.data?.message || "Erro interno do servidor",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (jobId: string) => employmentAPI.deleteJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({
        title: "Vaga removida!",
        description: "Vaga de emprego removida com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao remover vaga",
        description: error.response?.data?.message || "Erro interno do servidor",
        variant: "destructive",
      });
    },
  });
};