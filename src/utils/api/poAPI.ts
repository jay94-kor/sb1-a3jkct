import axios from 'axios';
import { PO } from '../../types';

export const poAPI = {
  getAll: (page: number = 1) => 
    axios.get(`/api/pos?page=${page}`).then(res => res.data),
    
  getById: (id: number) => 
    axios.get(`/api/pos/${id}`).then(res => res.data),
    
  create: (data: Omit<PO, 'id' | 'status' | 'created_at'>) =>
    axios.post('/api/pos', data).then(res => res.data),
    
  update: (data: Partial<PO> & { id: number }) =>
    axios.put(`/api/pos/${data.id}`, data).then(res => res.data),
    
  uploadFile: (poId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`/api/pos/${poId}/files`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  }
}; 