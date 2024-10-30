from decimal import Decimal, ROUND_HALF_UP
from typing import Dict, Any

def calculate_amounts(total_amount: int, advance_rate: float, category: str) -> Dict[str, Any]:
    """Calculate PO amounts"""
    advance_rate = Decimal(str(advance_rate))
    total_amount = Decimal(str(total_amount))
    
    if category == "부가세 10%":
        supply_amount = total_amount / Decimal('1.1')
        tax_amount = total_amount - supply_amount
    elif category == "원천세 3.3%":
        tax_amount = total_amount * Decimal('0.033')
        supply_amount = total_amount - tax_amount
    else:
        tax_amount = total_amount * Decimal('0.088')
        supply_amount = total_amount - tax_amount
    
    advance_amount = supply_amount * advance_rate
    balance_amount = supply_amount - advance_amount
    
    return {
        'supply_amount': int(supply_amount),
        'tax_amount': int(tax_amount),
        'advance_amount': int(advance_amount),
        'balance_amount': int(balance_amount)
    }