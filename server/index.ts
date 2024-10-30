import express from 'express';
import { Database } from 'sqlite3';
import { createRouter } from './routes';

const app = express();
const db = new Database('project_management.db');

app.use(express.json());

// 라우터 설정
app.use('/api', createRouter(db));

// 에러 핸들링 미들웨어
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: '서버 오류가 발생했습니다.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});