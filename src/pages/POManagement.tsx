'use client';

import { useState } from 'react';
import { Title, Text, Button, Dialog, DialogPanel } from '@tremor/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { poAPI } from '../utils/api';
import POList from '../components/POList';
import POForm from '../components/POForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { PO } from '../types';


export default function POManagement() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['pos'],
    queryFn: () => poAPI.getAll(1)
  });

  const approveMutation = useMutation({
    mutationFn: (po: PO) => poAPI.update({ ...po, status: 'approved' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pos'] });
    }
  });

  const rejectMutation = useMutation({
    mutationFn: (po: PO) => poAPI.update({ ...po, status: 'rejected' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pos'] });
    }
  });

  const handleApprove = (po: PO) => {
    approveMutation.mutate(po);
  };

  const handleReject = (po: PO) => {
    rejectMutation.mutate(po);
  };

  const handleViewDetail = (po: PO) => {
    // PO 상세 보기 구현
    console.log('View PO:', po);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Title>PO 관리</Title>
          <Text>발주서(PO) 발행 및 관리를 수행합니다.</Text>
        </div>
        <Button 
          color="blue"
          onClick={() => setIsFormOpen(true)}
        >
          PO 발행
        </Button>
      </div>

      {isLoading ? <LoadingSpinner /> :
       error ? <ErrorMessage message="PO 목록을 불러오는데 실패했습니다." /> :
       <POList 
         data={data} 
         onApprove={handleApprove}
         onReject={handleReject}
         onViewDetail={handleViewDetail}
       />}

      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-lg p-6">
            <POForm onSuccess={() => setIsFormOpen(false)} />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}