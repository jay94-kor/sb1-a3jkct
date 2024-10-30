import { Request, Response } from 'express';
import { Database } from 'sqlite3';

export class BudgetController {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async getMetrics(req: Request, res: Response) {
    try {
      const [totals, composition, projectBudgets] = await Promise.all([
        this.getTotalMetrics(),
        this.getBudgetComposition(),
        this.getProjectBudgets()
      ]);

      res.json({
        ...totals,
        composition,
        projectBudgets
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  private async getTotalMetrics() {
    return new Promise((resolve, reject) => {
      this.db.get(`
        SELECT 
          SUM(total_budget) as totalBudget,
          SUM(used_budget) as spentBudget,
          (SUM(used_budget) * 100.0 / SUM(total_budget)) as utilizationRate
        FROM project_info
      `, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  private async getBudgetComposition() {
    return new Promise((resolve, reject) => {
      this.db.all(`
        SELECT 
          category,
          SUM(supply_amount) as value
        FROM po_issue
        GROUP BY category
      `, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  private async getProjectBudgets() {
    return new Promise((resolve, reject) => {
      this.db.all(`
        SELECT 
          project_name as name,
          total_budget as allocated,
          used_budget as spent,
          (total_budget - used_budget) as remaining
        FROM project_info
        ORDER BY total_budget DESC
        LIMIT 10
      `, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}