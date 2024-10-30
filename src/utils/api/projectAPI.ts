import axios from 'axios';
import { Project } from '../../types';

const API_URL = '/api/projects';

export const projectAPI = {
  getAll: async (): Promise<Project[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getById: async (id: number): Promise<Project> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (project: Omit<Project, "project_id">): Promise<Project> => {
    const response = await axios.post(API_URL, project);
    return response.data;
  },

  getDrafts: async (): Promise<Project[]> => {
    const response = await axios.get(`${API_URL}/drafts`);
    return response.data;
  },

  activate: async (id: number): Promise<Project> => {
    const response = await axios.post(`${API_URL}/${id}/activate`);
    return response.data;
  }
}; 