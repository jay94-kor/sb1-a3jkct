export const calculateProjectBudget = (
  contractAmount: number,
  startDate: string,
  endDate: string
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  
  // 부가세 제외 수주액
  const baseAmount = contractAmount / 1.1;
  
  // 각종 비용 계산
  const agencyFee = baseAmount * 0.08; // 일반 대행비 8%
  const companyMargin = baseAmount * 0.10; // 기업 마진 10%
  const minInternalLabor = baseAmount * (days * 0.00075); // 일당 0.075%
  
  // 총 예산
  const totalBudget = baseAmount - (agencyFee + companyMargin + minInternalLabor);
  
  return {
    agency_fee: agencyFee,
    company_margin: companyMargin,
    min_internal_labor: minInternalLabor,
    total_budget: totalBudget
  };
};

export const calculatePaymentBudgets = (
  totalBudget: number,
  advanceRate: number // 선금 비율 (0-1 사이 값)
) => {
  const advanceBudget = totalBudget * advanceRate;
  const balanceBudget = totalBudget * (1 - advanceRate);
  
  return {
    advance_payment: advanceBudget,
    balance_payment: balanceBudget
  };
}; 