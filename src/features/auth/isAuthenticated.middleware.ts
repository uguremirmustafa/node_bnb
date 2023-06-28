import { Request, Response, NextFunction } from 'express';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return next();
  }

  res.status(401).json({ message: 'Unauthorized' });
};

export default isAuthenticated;
