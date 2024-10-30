import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from '@tremor/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Project } from '../types';

export default function ProjectList() {
  const { data: projects } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => axios.get('/api/projects').then(res => res.data)
  });

  const formatKRW = (value: number) => 
    new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0
    }).format(value);

  const getStatusColor = (usageRate: number) => {
    if (usageRate >= 90) return 'red';
    if (usageRate >= 70) return 'yellow';
    return 'green';
  };

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>프로젝트명</TableHeaderCell>
            <TableHeaderCell>담당자</TableHeaderCell>
            <TableHeaderCell>계약금액</TableHeaderCell>
            <TableHeaderCell>예산 사용률</TableHeaderCell>
            <TableHeaderCell>상태</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects?.map(project => {
            const usageRate = (project.used_budget / project.total_budget) * 100;
            return (
              <TableRow key={project.project_id}>
                <TableCell>{project.project_name}</TableCell>
                <TableCell>{project.project_manager}</TableCell>
                <TableCell>{formatKRW(project.contract_amount)}</TableCell>
                <TableCell>{usageRate.toFixed(1)}%</TableCell>
                <TableCell>
                  <Badge color={getStatusColor(usageRate)}>
                    {usageRate >= 90 ? '위험' : usageRate >= 70 ? '주의' : '정상'}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}