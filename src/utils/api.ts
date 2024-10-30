import axios from 'axios';
import { Project, PO, Budget, BudgetAlert } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Error handling interceptor
api.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = error.response?.data?.message || '서버와의 통신 중 오류가 발생했습니다.';
    console.error('API Error:', errorMessage);
    throw new Error(errorMessage);
  }
);

export const projectAPI = {
  getAll: async (): Promise<Project[]> => {
    const { data } = await api.get('/projects');
    return data;
  },
  
  getById: async (id: number): Promise<Project> => {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  },
  
  create: async (project: Omit<Project, 'id'>): Promise<Project> => {
    const { data } = await api.post('/projects', project);
    return data;
  }
};

export const budgetAPI = {
  getOverview: async (): Promise<Budget[]> => {
    const { data } = await api.get('/budgets/overview');
    return data;
  },
  
  getAlerts: async (): Promise<BudgetAlert[]> => {
    const { data } = await api.get('/budgets/alerts');
    return data;
  }
};

export const poAPI = {
  getAll: async (page: number = 1): Promise<{ data: PO[], pagination: { current: number, total: number } }> => {
    const { data } = await api.get(`/pos?page=${page}`);
    return data;
  },
  
  create: async (po: Omit<PO, 'id'>): Promise<PO> => {
    const { data } = await api.post('/pos', po);
    return data;
  }
};