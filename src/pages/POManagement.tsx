import { Title, Text } from '@tremor/react';
import { useQuery } from '@tanstack/react-query';
import { poAPI } from '../utils/api';
import POList from '../components/POList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function POManagement() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pos'],
    queryFn: () => poAPI.getAll(1)
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title>PO 관리</Title>
        <Text>발주서(PO) 발행 및 관리를 수행합니다.</Text>
      </div>
      {isLoading ? <LoadingSpinner /> :
       error ? <ErrorMessage message="PO 목록을 불러오는데 실패했습니다." /> :
       <POList data={data} />}
    </div>
  );
}