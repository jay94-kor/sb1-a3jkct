export interface Project {
  project_id: number;
  project_name: string;
  project_manager: string;
  contract_amount: number;
  total_budget: number;
  used_budget: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'completed';
  created_at: string;
}

export interface ProjectBudget {
  total_budget: number;
  used_budget: number;
  remaining_budget: number;
  usage_rate: number;
  advance_budget: number;
  balance_budget: number;
  used_advance: number;
  used_balance: number;
}

export interface Budget {
  project_name: string;
  total_budget: number;
  used_amount: number;
  remaining_amount: number;
}

export interface BudgetAlert {
  project_name: string;
  severity: 'high' | 'medium' | 'low';
  type: string;
  message: string;
}

export interface PO {
  id: number;
  project_id: number;
  project_name?: string;
  po_number: string;
  supplier: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}