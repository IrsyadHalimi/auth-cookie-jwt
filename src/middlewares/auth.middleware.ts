/** Middleware to protect routes via cookie-based JWT */
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth.service';

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};