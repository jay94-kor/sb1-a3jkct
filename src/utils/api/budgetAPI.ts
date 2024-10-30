import axios from 'axios';
import { Budget, BudgetAlert } from '../../types';

export const budgetAPI = {
  getOverview: async (): Promise<Budget[]> => {
    const response = await axios.get('/api/budgets/overview');
    return response.data;
  },

  getAlerts: async (): Promise<BudgetAlert[]> => {
    const response = await axios.get('/api/budgets/alerts');
    return response.data;
  }
}; 