export interface Project {
  project_id: number;
  project_name: string;
  project_manager: string;
  contract_amount: number;
  total_budget: number;
  used_budget: number;
  start_date: string;
  end_date: string;
  status: 'draft' | 'active' | 'completed';
  created_at: string;
  manager?: string;
  announcement_number?: string;
  max_bid_amount?: number;
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
  advance_payment: number;
  balance_payment: number;
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
  project_name: string;
  po_number: string;
  supplier: string;
  amount: number;
  payment_type: 'advance' | 'balance';
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  tax_invoice_date?: string;
  payment_due_date?: string;
  description?: string;
  detailed_memo?: string;
  category?: string;
  advance_rate?: number;
  contract_file?: string;
  estimate_file?: string;
  business_cert_file?: string;
  bank_file?: string;
}

export interface ProjectDraft {
  manager: string;
  announcement_number: string;
  max_bid_amount: number;
  start_date: string;
  end_date: string;
  status: 'draft' | 'active' | 'completed';
}