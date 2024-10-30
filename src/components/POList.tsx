import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button } from '@tremor/react';
import { formatKRW } from '../utils/format';
import { PO } from '../types';

interface POListProps {
  data?: {
    data: PO[];
    pagination: {
      current: number;
      total: number;
    };
  };
  onApprove?: (po: PO) => void;
  onReject?: (po: PO) => void;
  onViewDetail?: (po: PO) => void;
}

const POList = ({ data, onApprove, onReject, onViewDetail }: POListProps) => {
  if (!data) return null;
  
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
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>PO 번호</TableHeaderCell>
          <TableHeaderCell>프로젝트명</TableHeaderCell>
          <TableHeaderCell>공급자</TableHeaderCell>
          <TableHeaderCell>금액</TableHeaderCell>
          <TableHeaderCell>구분</TableHeaderCell>
          <TableHeaderCell>상태</TableHeaderCell>
          <TableHeaderCell>액션</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.data.map((po) => (
          <TableRow key={po.id}>
            <TableCell>{po.po_number}</TableCell>
            <TableCell>{po.project_name}</TableCell>
            <TableCell>{po.supplier}</TableCell>
            <TableCell>{formatKRW(po.amount)}</TableCell>
            <TableCell>
              <Badge color={po.payment_type === 'advance' ? 'blue' : 'purple'}>
                {po.payment_type === 'advance' ? '선금' : '잔금'}
              </Badge>
            </TableCell>
            <TableCell>{getStatusBadge(po.status)}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button 
                  size="xs"
                  variant="secondary" 
                  onClick={() => onViewDetail?.(po)}
                >
                  상세
                </Button>
                {po.status === 'pending' && (
                  <>
                    <Button 
                      size="xs"
                      color="green"
                      onClick={() => onApprove?.(po)}
                    >
                      승인
                    </Button>
                    <Button 
                      size="xs"
                      color="red"
                      onClick={() => onReject?.(po)}
                    >
                      반려
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default POList; 