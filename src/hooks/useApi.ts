import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Project, Budget, BudgetAlert, PO } from '../types';
import { projectAPI, budgetAPI, poAPI } from '../utils/api';
import axios from 'axios';

export const useProjects = () => {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: projectAPI.getAll,
    retry: 1,
    staleTime: 1000 * 60 * 5
  });
};

export const useBudgetOverview = () => {
  return useQuery<Budget[]>({
    queryKey: ['budgets', 'overview'],
    queryFn: budgetAPI.getOverview,
    retry: 1,
    staleTime: 1000 * 60 * 5
  });
};

export const useBudgetAlerts = () => {
  return useQuery<BudgetAlert[]>({
    queryKey: ['budgets', 'alerts'],
    queryFn: budgetAPI.getAlerts,
    retry: 1,
    staleTime: 1000 * 60
  });
};

export const usePOs = (page: number) => {
  return useQuery<{ data: PO[], pagination: { current: number, total: number } }>({
    queryKey: ['pos', page],
    queryFn: () => poAPI.getAll(page),
    retry: 1,
    staleTime: 1000 * 60 * 5
  });
};

export const useCreateProject = () => {
  return useMutation<Project, Error, Omit<Project, "project_id">>({
    mutationFn: async (project) => {
      const response = await projectAPI.create(project);
      return response;
    }
  });
};

export const useCreatePO = () => {
  return useMutation<PO, AxiosError, Omit<PO, 'id'>>({
    mutationFn: async (po) => {
      const response = await poAPI.create(po);
      return response;
    }
  });
};

export const useUpdatePO = () => {
  return useMutation<PO, Error, PO>({
    mutationFn: async (po) => {
      const response = await axios.put(`/api/pos/${po.id}`, po);
      return response.data;
    }
  });
};  