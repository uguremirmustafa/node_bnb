import express from 'express';
import { registerUser } from '@feat/auth/auth.service';
import passport from 'passport';
import isAuthenticated from './isAuthenticated.middleware';

const router = express.Router();

router.get('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful', user: req.user });
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const result = await registerUser({ email, password });
  res.status(result.code).json(result);
});

router.get('/profile', isAuthenticated, async (req, res) => {
  res.status(200).json(req.user);
});

export default router;
