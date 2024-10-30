import { Title, Text } from '@tremor/react';
import ProjectList from '../components/ProjectList';

export default function ProjectManagement() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <Title>프로젝트 관리</Title>
        <Text>전체 프로젝트 목록과 상세 정보를 관리합니다.</Text>
      </div>
      <ProjectList />
    </div>
  );
}