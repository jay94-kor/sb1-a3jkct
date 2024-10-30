import { Request, Response } from 'express';
import { Database } from 'sqlite3';

export class ProjectController {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async getBudget(req: Request, res: Response) {
    const { projectId } = req.params;

    try {
      const project = await this.getProjectInfo(projectId);
      const poSummary = await this.getPOSummary(projectId);

      const budget = {
        total_budget: project.total_budget,
        used_budget: poSummary.total_used,
        remaining_budget: project.total_budget - poSummary.total_used,
        usage_rate: (poSummary.total_used / project.total_budget) * 100,
        advance_budget: project.advance_budget,
        balance_budget: project.balance_budget,
        used_advance: poSummary.used_advance,
        used_balance: poSummary.used_balance
      };

      res.json(budget);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  private getProjectInfo(projectId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM project_info WHERE project_id = ?`,
        [projectId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  private getPOSummary(projectId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT 
          SUM(supply_amount) as total_used,
          SUM(CASE WHEN advance_rate > 0 THEN advance_amount ELSE 0 END) as used_advance,
          SUM(CASE WHEN balance_rate > 0 THEN balance_amount ELSE 0 END) as used_balance
        FROM po_issue 
        WHERE project_id = ?`,
        [projectId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }
}