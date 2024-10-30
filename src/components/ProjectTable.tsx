import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Text } from '@tremor/react';
import { useQuery } from '@tanstack/react-query';
import { projectAPI } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { Project } from '../types';

export default function ProjectTable() {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: projectAPI.getAll,
    retry: 1
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="프로젝트 목록을 불러오는데 실패했습니다." />;
  if (!projects?.length) return <Text>등록된 프로젝트가 없습니다.</Text>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>프로젝트명</TableHeaderCell>
          <TableHeaderCell>담당자</TableHeaderCell>
          <TableHeaderCell>시작일</TableHeaderCell>
          <TableHeaderCell>종료일</TableHeaderCell>
          <TableHeaderCell>예산</TableHeaderCell>
          <TableHeaderCell>상태</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {projects.map((project: Project) => (
          <TableRow key={project.project_id}>
            <TableCell>{project.project_name}</TableCell>
            <TableCell>{project.project_manager}</TableCell>
            <TableCell>{new Date(project.start_date).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(project.end_date).toLocaleDateString()}</TableCell>
            <TableCell>
              {new Intl.NumberFormat('ko-KR').format(project.total_budget)}원
            </TableCell>
            <TableCell>
              <Text color={project.status === 'active' ? 'green' : 'gray'}>
                {project.status === 'active' ? '진행중' : '종료'}
              </Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}