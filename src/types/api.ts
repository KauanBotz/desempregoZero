export interface LoginResponse {
  token: string;
  expires_at: string;
  admin: {
    id: number;
    username: string;
    email: string;
  };
}

export interface Candidate {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  email: string;
  phone: string;
  resume: string;
  experience: string;
  education: string;
  jobs?: Job[];
}

export interface Job {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  requirements: string;
  deadline: string;
  active: boolean;
  candidates?: Candidate[];
}

export interface CreateJobData {
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  requirements: string;
  deadline: string;
  active?: boolean;
}

export interface CreateCandidateData {
  name: string;
  email: string;
  phone: string;
  resume: string;
  experience: string;
  education: string;
}