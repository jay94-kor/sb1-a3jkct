import { Title, Text } from '@tremor/react';
import BudgetOverview from '../components/BudgetOverview';
import BudgetAlerts from '../components/BudgetAlerts';

export default function BudgetManagement() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <Title>예산 관리</Title>
        <Text>프로젝트 예산 현황과 집행 내역을 관리합니다.</Text>
      </div>
      <div className="space-y-6">
        <BudgetOverview />
        <BudgetAlerts />
      </div>
    </div>
  );
}