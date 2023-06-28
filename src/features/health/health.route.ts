import db from '@/initializers/db';
import express from 'express';

const router = express.Router();

router.get('/api/health', async (req, res) => {
  try {
    const data = await db.any('SELECT * FROM users');
    res.json({ users: data });
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
