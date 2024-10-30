import { Project, PO, Budget, BudgetAlert } from '../types';

export const dummyProjects: Project[] = [
  {
    project_id: 1,
    project_name: "클라우드 마이그레이션",
    project_manager: "김철수",
    contract_amount: 150000000,
    total_budget: 120000000,
    used_budget: 80000000,
    start_date: "2024-01-01",
    end_date: "2024-06-30",
    status: "active",
    created_at: "2023-12-15"
  },
  {
    project_id: 2,
    project_name: "ERP 시스템 구축",
    project_manager: "박영희",
    contract_amount: 200000000,
    total_budget: 180000000,
    used_budget: 90000000,
    start_date: "2024-02-01",
    end_date: "2024-12-31",
    status: "active",
    created_at: "2024-01-15"
  }
];

export const dummyPOs: { 
  data: PO[]; 
  pagination: { 
    current: number; 
    total: number; 
  }; 
} = {
  data: [
    {
      id: 1,
      project_id: 1,
      project_name: "클라우드 마이그레이션",
      po_number: "PO-2024-001",
      supplier: "클라우드서비스(주)",
      amount: 50000000,
      status: "approved",
      created_at: "2024-01-15"
    },
    {
      id: 2,
      project_id: 1,
      project_name: "클라우드 마이그레이션",
      po_number: "PO-2024-002",
      supplier: "컨설팅코리아",
      amount: 30000000,
      status: "pending",
      created_at: "2024-02-01"
    }
  ],
  pagination: {
    current: 1,
    total: 1
  }
};

export const dummyBudgets: Budget[] = [
  {
    project_name: "클라우드 마이그레이션",
    total_budget: 120000000,
    used_amount: 80000000,
    remaining_amount: 40000000
  },
  {
    project_name: "ERP 시스템 구축",
    total_budget: 180000000,
    used_amount: 90000000,
    remaining_amount: 90000000
  }
];

export const dummyBudgetAlerts: BudgetAlert[] = [
  {
    project_name: "클라우드 마이그레이션",
    severity: "high",
    type: "예산 초과 위험",
    message: "예산 사용률 80% 초과"
  },
  {
    project_name: "ERP 시스템 구축",
    severity: "medium",
    type: "예산 주의",
    message: "예산 사용률 70% 도달"
  }
];

export const mockAPIResponse = <T>(data: T, delay: number = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}; 