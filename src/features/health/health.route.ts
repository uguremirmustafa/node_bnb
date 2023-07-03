import db from '@/initializers/db';
import express from 'express';

const router = express.Router();

router.get('/api/health', async (req, res) => {
  try {
    res.json({ message: 'up and running' });
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
