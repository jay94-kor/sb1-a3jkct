import { Card, Title, List, ListItem, Text, Badge } from '@tremor/react';
import { useQuery } from '@tanstack/react-query';
import { budgetAPI } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

export default function BudgetAlerts() {
  const { data: alerts, isLoading, error } = useQuery({
    queryKey: ['budgets', 'alerts'],
    queryFn: budgetAPI.getAlerts,
    retry: 1
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="예산 알림을 불러오는데 실패했습니다." />;
  if (!alerts?.length) return <Text>현재 알림이 없습니다.</Text>;

  return (
    <Card>
      <Title>예산 알림</Title>
      <List className="mt-4">
        {alerts.map((alert, index) => (
          <ListItem key={index}>
            <div className="flex items-center justify-between">
              <div>
                <Text>{alert.project_name}</Text>
                <Text className="text-sm text-gray-500">{alert.message}</Text>
              </div>
              <Badge
                color={alert.severity === 'high' ? 'red' : 
                       alert.severity === 'medium' ? 'yellow' : 'blue'}
              >
                {alert.type}
              </Badge>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}