import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: '서버 오류가 발생했습니다.'
  });
});

// Projects API
app.get('/api/projects', (req, res) => {
  try {
    const projects = db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();
    res.json(projects);
  } catch (error) {
    console.error('프로젝트 조회 오류:', error);
    res.status(500).json({
      error: true,
      message: '프로젝트 목록을 불러오는데 실패했습니다.'
    });
  }
});

// Budgets API
app.get('/api/budgets/overview', (req, res) => {
  try {
    const budgets = db.prepare(`
      SELECT 
        p.name as project_name,
        b.total_budget,
        b.used_amount,
        b.remaining_amount
      FROM budgets b
      JOIN projects p ON b.project_id = p.id
      ORDER BY b.created_at DESC
    `).all();
    res.json(budgets);
  } catch (error) {
    console.error('예산 현황 조회 오류:', error);
    res.status(500).json({
      error: true,
      message: '예산 현황을 불러오는데 실패했습니다.'
    });
  }
});

app.get('/api/budgets/alerts', (req, res) => {
  try {
    const alerts = db.prepare(`
      SELECT 
        p.name as project_name,
        CASE
          WHEN b.remaining_amount < 0 THEN 'high'
          WHEN b.remaining_amount < (b.total_budget * 0.1) THEN 'medium'
          ELSE 'low'
        END as severity,
        CASE
          WHEN b.remaining_amount < 0 THEN '예산 초과'
          WHEN b.remaining_amount < (b.total_budget * 0.1) THEN '예산 부족'
          ELSE '정상'
        END as type,
        '잔여 예산: ' || printf('%,d원', b.remaining_amount) as message
      FROM budgets b
      JOIN projects p ON b.project_id = p.id
      WHERE b.remaining_amount < (b.total_budget * 0.2)
      ORDER BY severity DESC, b.remaining_amount ASC
    `).all();
    res.json(alerts);
  } catch (error) {
    console.error('예산 알림 조회 오류:', error);
    res.status(500).json({
      error: true,
      message: '예산 알림을 불러오는데 실패했습니다.'
    });
  }
});

// POs API
app.get('/api/pos', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const pos = db.prepare(`
      SELECT 
        po.*,
        p.name as project_name
      FROM pos po
      JOIN projects p ON po.project_id = p.id
      ORDER BY po.created_at DESC
      LIMIT ? OFFSET ?
    `).all(limit, offset);

    const total = db.prepare('SELECT COUNT(*) as count FROM pos').get().count;

    res.json({
      data: pos,
      pagination: {
        current: page,
        total: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('PO 목록 조회 오류:', error);
    res.status(500).json({
      error: true,
      message: 'PO 목록을 불러오는데 실패했습니다.'
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});