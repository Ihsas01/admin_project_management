import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/auth';
import { UnauthorizedError, ForbiddenError } from '@/utils/errors';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'STAFF';
  status: 'ACTIVE' | 'INACTIVE';
}

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    // Attach user to request object
    req.user = {
      id: decoded.userId,
      name: '', // Name is not stored in the token
      email: decoded.email,
      role: decoded.role,
      status: 'ACTIVE' // Status is not stored in the token
    };
    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return next(error);
    }
    return next(new UnauthorizedError('Invalid or expired token'));
  }
};

export const authorizeRoles = (...roles: ('ADMIN' | 'MANAGER' | 'STAFF')[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError());
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('Access denied. Insufficient permissions.'));
    }

    next();
  };
};