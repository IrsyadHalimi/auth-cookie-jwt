import jwt from 'jsonwebtoken';
import { TokenPayload, User } from '../interfaces/auth.interface';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export const generateToken = (user: User): string => {
  return jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, SECRET) as TokenPayload;
};