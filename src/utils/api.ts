import axios from 'axios';
import { Project, PO, Budget, BudgetAlert } from '../types';
import { mockAPIResponse, dummyProjects, dummyPOs, dummyBudgets, dummyBudgetAlerts } from './dummyData';

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

// 개발 환경에서만 더미 데이터 사용
const isDevelopment = process.env.NODE_ENV === 'development';

export const projectAPI = {
  getAll: async (): Promise<Project[]> => {
    if (isDevelopment) {
      return mockAPIResponse(dummyProjects);
    }
    const { data } = await api.get('/projects');
    return data;
  },
  
  getById: async (id: number): Promise<Project> => {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  },
  
  create: async (project: Omit<Project, "project_id">): Promise<Project> => {
    if (isDevelopment) {
      return mockAPIResponse({
        ...project,
        project_id: Math.floor(Math.random() * 1000),
        created_at: new Date().toISOString()
      });
    }
    const { data } = await api.post('/projects', project);
    return data;
  }
};

export const budgetAPI = {
  getOverview: async (): Promise<Budget[]> => {
    if (isDevelopment) {
      return mockAPIResponse(dummyBudgets);
    }
    const { data } = await api.get('/budgets/overview');
    return data;
  },
  
  getAlerts: async (): Promise<BudgetAlert[]> => {
    if (isDevelopment) {
      return mockAPIResponse(dummyBudgetAlerts);
    }
    const { data } = await api.get('/budgets/alerts');
    return data;
  }
};

export const poAPI = {
  getAll: async (page: number = 1): Promise<{ data: PO[], pagination: { current: number, total: number } }> => {
    if (isDevelopment) {
      return mockAPIResponse(dummyPOs);
    }
    const { data } = await api.get(`/pos?page=${page}`);
    return data;
  },
  
  create: async (po: Omit<PO, 'id'>): Promise<PO> => {
    if (isDevelopment) {
      return mockAPIResponse({
        ...po,
        id: Math.floor(Math.random() * 1000),
        created_at: new Date().toISOString()
      });
    }
    const { data } = await api.post('/pos', po);
    return data;
  },

  update: async (po: PO): Promise<PO> => {
    const { data } = await api.put(`/pos/${po.id}`, po);
    return data;
  }
};