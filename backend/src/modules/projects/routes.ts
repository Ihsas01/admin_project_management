import { Router } from 'express';
import { createProject, getAllProjects, updateProject, deleteProject } from './controllers';
import { authenticate, authorizeRoles } from '@/middlewares/auth';

const router = Router();

// Protected routes (all authenticated users can access)
router.post('/', authenticate, createProject);
router.get('/', authenticate, getAllProjects);

// Protected routes (ADMIN only)
router.patch('/:id', authenticate, authorizeRoles('ADMIN'), updateProject);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteProject);

export default router;