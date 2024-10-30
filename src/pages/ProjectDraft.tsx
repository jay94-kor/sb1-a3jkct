import { useState } from 'react';
import { Title, Text, Card, Badge, Button } from '@tremor/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { projectAPI } from '../utils/api';
import ProjectDraftForm from '../components/ProjectDraftForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { formatKRW } from '../utils/format';
import { Dialog } from '@headlessui/react';
import { Project } from '../types';

interface DraftProps {
  onSuccess: () => void;
}

export default function ProjectDraft({ onSuccess }: DraftProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: drafts, isLoading, error } = useQuery({
    queryKey: ['projectDrafts'],
    queryFn: () => projectAPI.getDrafts()
  });

  const handleActivate = async (draft: Project) => {
    try {
      await projectAPI.activate(draft.project_id);
      onSuccess();
    } catch (error) {
      console.error('프로젝트 활성화 실패:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title>프로젝트 초안</Title>
          <Text>새 프로젝트 초안을 작성하고 관리합니다.</Text>
        </div>
        <Button 
          color="blue"
          onClick={() => setIsFormOpen(true)}
        >
          초안 작성
        </Button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message="초안 목록을 불러오는데 실패했습니다." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drafts?.map((draft) => (
            <Card key={draft.project_id}>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Text className="font-medium">{draft.announcement_number}</Text>
                  <Badge color={draft.status === 'draft' ? 'yellow' : 'green'}>
                    {draft.status === 'draft' ? '초안' : '활성'}
                  </Badge>
                </div>
                <div>
                  <Text className="text-gray-500">담당자</Text>
                  <Text>{draft.manager}</Text>
                </div>
                <div>
                  <Text className="text-gray-500">최대 입찰 금액</Text>
                  <Text>{formatKRW(draft.max_bid_amount ?? 0)}</Text>
                </div>
                <div className="flex justify-end">
                  {draft.status === 'draft' && (
                    <Button
                      size="xs"
                      onClick={() => handleActivate(draft)}
                    >
                      프로젝트 활성화
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {isFormOpen && (
        <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
          <Dialog.Panel>
            <div className="p-6">
              <Title>프로젝트 초안 작성</Title>
              <div className="mt-4">
                <ProjectDraftForm 
                  onSuccess={() => {
                    setIsFormOpen(false);
                    queryClient.invalidateQueries({ queryKey: ['projectDrafts'] });
                  }}
                />
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
  );
} 