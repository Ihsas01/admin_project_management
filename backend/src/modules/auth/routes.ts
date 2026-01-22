import { Router } from 'express';
import { login, createInvite, registerViaInvite } from './controllers';
import { authenticate, authorizeRoles } from '@/middlewares/auth';

const router = Router();

// Public routes
router.post('/login', login);
router.post('/register-via-invite', registerViaInvite);

// Protected routes (ADMIN only)
router.post('/invite', authenticate, authorizeRoles('ADMIN'), createInvite);

export default router;