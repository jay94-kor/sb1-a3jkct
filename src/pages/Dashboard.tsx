import { Title, Text, Tab, TabList, TabGroup, TabPanel, TabPanels } from '@tremor/react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import BudgetOverview from '../components/BudgetOverview';
import ProjectTable from '../components/ProjectTable';
import BudgetAlerts from '../components/BudgetAlerts';

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title>프로젝트 대시보드</Title>
        <Text>마지막 업데이트: {format(new Date(), 'PPP', { locale: ko })}</Text>
      </div>

      <TabGroup>
        <TabList className="mb-6">
          <Tab>예산 현황</Tab>
          <Tab>프로젝트 현황</Tab>
          <Tab>알림</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <BudgetOverview />
          </TabPanel>
          
          <TabPanel>
            <ProjectTable />
          </TabPanel>
          
          <TabPanel>
            <BudgetAlerts />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}