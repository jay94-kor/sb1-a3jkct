import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ProjectBudget } from '../types';

export function useProjectBudget(projectId: number) {
  return useQuery<ProjectBudget>({
    queryKey: ['projectBudget', projectId],
    queryFn: () => axios.get(`/api/projects/${projectId}/budget`).then(res => res.data),
    enabled: !!projectId
  });
}