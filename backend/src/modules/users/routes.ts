import { Router } from 'express';
import { getAllUsers, updateUserRole, updateUserStatus } from './controllers';
import { authenticate, authorizeRoles } from '@/middlewares/auth';

const router = Router();

// Protected routes (ADMIN only)
router.get('/', authenticate, authorizeRoles('ADMIN'), getAllUsers);
router.patch('/:id/role', authenticate, authorizeRoles('ADMIN'), updateUserRole);
router.patch('/:id/status', authenticate, authorizeRoles('ADMIN'), updateUserStatus);

export default router;