import { Router } from 'express';
import { Database } from 'sqlite3';
import { ProjectController } from '../controllers/projectController';

export function createRouter(db: Database) {
  const router = Router();
  const projectController = new ProjectController(db);

  // 프로젝트 예산 조회
  router.get('/projects/:projectId/budget', (req, res) => 
    projectController.getBudget(req, res)
  );

  // 프로젝트 목록 조회
  router.get('/projects', (req, res) => {
    db.all(`
      SELECT 
        p.*,
        COALESCE(SUM(po.supply_amount), 0) as used_budget,
        COUNT(po.po_id) as po_count
      FROM project_info p
      LEFT JOIN po_issue po ON p.project_id = po.project_id
      GROUP BY p.project_id
      ORDER BY p.created_at DESC
    `, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

  // PO 목록 조회
  router.get('/projects/:projectId/pos', (req, res) => {
    const { projectId } = req.params;
    db.all(`
      SELECT *
      FROM po_issue
      WHERE project_id = ?
      ORDER BY created_at DESC
    `, [projectId], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

  return router;
}