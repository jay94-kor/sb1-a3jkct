import { Card, Title, Text, Badge, Button } from '@tremor/react';
import { PO } from '../types';
import { formatKRW } from '../utils/format';

interface PODetailProps {
  po: PO;
  onClose: () => void;
}

export default function PODetail({ po, onClose }: PODetailProps) {
  const getStatusBadge = (status: PO['status']) => {
    switch (status) {
      case 'pending':
        return <Badge color="yellow">검토중</Badge>;
      case 'approved':
        return <Badge color="green">승인됨</Badge>;
      case 'rejected':
        return <Badge color="red">반려됨</Badge>;
    }
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <Title>PO 상세 정보</Title>
            <Text>PO 번호: {po.po_number}</Text>
          </div>
          {getStatusBadge(po.status)}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Text className="text-gray-500">프로젝트</Text>
            <Text className="font-medium">{po.project_name}</Text>
          </div>
          <div>
            <Text className="text-gray-500">공급자</Text>
            <Text className="font-medium">{po.supplier}</Text>
          </div>
          <div>
            <Text className="text-gray-500">금액</Text>
            <Text className="font-medium">{formatKRW(po.amount)}</Text>
          </div>
          <div>
            <Text className="text-gray-500">구분</Text>
            <Badge color={po.payment_type === 'advance' ? 'blue' : 'purple'}>
              {po.payment_type === 'advance' ? '선금' : '잔금'}
            </Badge>
          </div>
          {po.tax_invoice_date && (
            <div>
              <Text className="text-gray-500">세금계산서 발행일</Text>
              <Text className="font-medium">{po.tax_invoice_date}</Text>
            </div>
          )}
          {po.payment_due_date && (
            <div>
              <Text className="text-gray-500">지급예정일</Text>
              <Text className="font-medium">{po.payment_due_date}</Text>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </Card>
  );
} 