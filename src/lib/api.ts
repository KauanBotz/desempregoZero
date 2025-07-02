import axios from 'axios';

// Configuração do axios para conexão com backend Go
const api = axios.create({
  baseURL: 'https://desemprego-zero.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para requisições
api.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação se necessário
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptador para respostas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratamento de erros globais
    if (error.response?.status === 401) {
      // Token expirado, redirecionar para login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Funções da API para o sistema de emprego
export const employmentAPI = {
  // Buscar oportunidades de emprego
  getJobs: async (params?: { city?: string; category?: string; page?: number }) => {
    const response = await api.get('/jobs', { params });
    return response.data;
  },

  // Criar nova oportunidade
  createJob: async (jobData: any) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  // Candidatar-se a uma vaga
  applyToJob: async (jobId: string, applicationData: any) => {
    const response = await api.post(`/jobs/${jobId}/apply`, applicationData);
    return response.data;
  },

  // Buscar estatísticas
  getStats: async () => {
    const response = await api.get('/stats');
    return response.data;
  },

  // Cadastrar empresa parceira
  registerPartner: async (partnerData: any) => {
    const response = await api.post('/partners', partnerData);
    return response.data;
  },

  // Buscar empresas parceiras
  getPartners: async () => {
    const response = await api.get('/partners');
    return response.data;
  },

  // Autenticação 
  login: async (email: string, password: string) => {
    const response = await api.post('/admin/login', { email, password });
    return response.data;
  },

  // Buscar vaga específica
  getJob: async (jobId: string) => {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  },

  // Atualizar vaga
  updateJob: async (jobId: string, jobData: any) => {
    const response = await api.put(`/jobs/${jobId}`, jobData);
    return response.data;
  },

  // Deletar vaga
  deleteJob: async (jobId: string) => {
    const response = await api.delete(`/jobs/${jobId}`);
    return response.data;
  },

  // Cadastrar candidato
  registerCandidate: async (candidateData: any) => {
    const response = await api.post('/candidates', candidateData);
    return response.data;
  },

  // Buscar candidatos
  getCandidates: async () => {
    const response = await api.get('/candidates');
    return response.data;
  },
};

export default api;