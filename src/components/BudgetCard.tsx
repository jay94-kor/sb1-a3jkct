import { Card, Text, Metric, ProgressBar } from '@tremor/react';
import { Color } from '@tremor/react';

interface BudgetCardProps {
  title: string;
  amount: number;
  total: number;
  color?: Color;
  trend?: number;
}

export default function BudgetCard({ 
  title, 
  amount, 
  total, 
  color = 'indigo',
  trend 
}: BudgetCardProps) {
  const percentage = (amount / total) * 100;
  const formattedAmount = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0
  }).format(amount);

  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <Text>{title}</Text>
          <Metric className="mt-2">{formattedAmount}</Metric>
        </div>
        {trend !== undefined && (
          <div className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <ProgressBar value={percentage} color={color} className="h-2" />
        <Text className="mt-2 text-right text-sm text-gray-500">
          {percentage.toFixed(1)}% 사용
        </Text>
      </div>
    </Card>
  );
}