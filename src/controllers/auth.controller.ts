/** Auth controller handling login and profile logic */
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { generateToken } from '../services/auth.service';

export const login = (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username) return res.status(400).json({ message: 'Username is required' });

  const user = { id: uuidv4(), username };
  const token = generateToken(user);

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600000 // 1 hour
  });

  return res.status(200).json({ message: 'Login successful', user });
};

export const profile = (req: any, res: Response) => {
  return res.status(200).json({ user: req.user });
};