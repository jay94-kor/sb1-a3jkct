import sqlite3
from typing import List, Dict, Any, Optional
from contextlib import contextmanager

@contextmanager
def get_db_connection():
    """Database connection context manager"""
    conn = sqlite3.connect("project_management.db")
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def get_projects() -> List[Dict[str, Any]]:
    """Get all projects"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT project_id, project_name, contract_amount, total_budget
            FROM project_info
            ORDER BY created_at DESC
        """)
        return [dict(row) for row in cursor.fetchall()]

def get_project_by_id(project_id: int) -> Optional[Dict[str, Any]]:
    """Get project by ID"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT *
            FROM project_info
            WHERE project_id = ?
        """, (project_id,))
        row = cursor.fetchone()
        return dict(row) if row else None

def save_po(po_data: Dict[str, Any]) -> bool:
    """Save PO to database"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        try:
            cursor.execute("""
                INSERT INTO po_issue (
                    po_number, project_id, supplier_name, description,
                    total_amount, supply_amount, tax_amount,
                    advance_rate, balance_rate, category,
                    contract_file, estimate_file
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                po_data['po_number'],
                po_data['project_id'],
                po_data['supplier_name'],
                po_data['description'],
                po_data['total_amount'],
                po_data['supply_amount'],
                po_data['tax_amount'],
                po_data['advance_rate'],
                po_data['balance_rate'],
                po_data['category'],
                po_data['contract_file'],
                po_data['estimate_file']
            ))
            conn.commit()
            return True
        except Exception:
            conn.rollback()
            return False