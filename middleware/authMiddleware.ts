import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ message: 'No token provided!' });

  const secret: Secret = process.env.JWT_SECRET || 'defaultSecret';
  jwt.verify(token as string, secret, (err, decoded: any) => {
    if (err) return res.status(401).send({ message: 'Unauthorized!' });
    if (decoded && 'id' in decoded) {
      req.userId = decoded.id;
      next();
    } else {
      return res.status(401).send({ message: 'Invalid token!' });
    }
  });
};
