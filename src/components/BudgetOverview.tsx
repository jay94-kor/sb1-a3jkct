import { Card, Title, Text, BarChart, Metric, Grid } from '@tremor/react';
import { useQuery } from '@tanstack/react-query';
import { budgetAPI } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

export default function BudgetOverview() {
  const { data: budgets, isLoading, error } = useQuery({
    queryKey: ['budgets', 'overview'],
    queryFn: budgetAPI.getOverview,
    retry: 1
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="예산 현황을 불러오는데 실패했습니다." />;
  if (!budgets?.length) return <Text>예산 데이터가 없습니다.</Text>;

  const chartData = budgets.map(budget => ({
    name: budget.project_name,
    '예산': budget.total_budget,
    '사용액': budget.used_amount,
    '잔액': budget.remaining_amount
  }));

  return (
    <Card>
      <Title>예산 현황</Title>
      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-4 mt-4">
        <Card>
          <Text>총 예산</Text>
          <Metric>{new Intl.NumberFormat('ko-KR').format(
            budgets.reduce((sum, b) => sum + b.total_budget, 0)
          )}원</Metric>
        </Card>
        <Card>
          <Text>총 사용액</Text>
          <Metric>{new Intl.NumberFormat('ko-KR').format(
            budgets.reduce((sum, b) => sum + b.used_amount, 0)
          )}원</Metric>
        </Card>
        <Card>
          <Text>총 잔액</Text>
          <Metric>{new Intl.NumberFormat('ko-KR').format(
            budgets.reduce((sum, b) => sum + b.remaining_amount, 0)
          )}원</Metric>
        </Card>
      </Grid>
      <div className="mt-8">
        <BarChart
          data={chartData}
          index="name"
          categories={['예산', '사용액', '잔액']}
          colors={['blue', 'red', 'green']}
          valueFormatter={(value) => 
            `${new Intl.NumberFormat('ko-KR').format(value)}원`
          }
          yAxisWidth={100}
        />
      </div>
    </Card>
  );
}