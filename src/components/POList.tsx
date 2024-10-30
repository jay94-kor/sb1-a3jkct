import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from '@tremor/react';
import { PO } from '../types';

interface POListProps {
  data?: {
    data: PO[];
    pagination: {
      current: number;
      total: number;
    };
  };
}

const POList = ({ data }: POListProps) => {
  if (!data) return null;
  
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>PO 번호</TableHeaderCell>
          <TableHeaderCell>프로젝트명</TableHeaderCell>
          <TableHeaderCell>공급자</TableHeaderCell>
          <TableHeaderCell>금액</TableHeaderCell>
          <TableHeaderCell>상태</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.data.map((po) => (
          <TableRow key={po.id}>
            <TableCell>{po.po_number}</TableCell>
            <TableCell>{po.project_name}</TableCell>
            <TableCell>{po.supplier}</TableCell>
            <TableCell>{po.amount}</TableCell>
            <TableCell>{po.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default POList; 