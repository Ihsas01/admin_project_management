import { z } from 'zod';

// User validation schemas
export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const updateUserRoleSchema = z.object({
  role: z.enum(['ADMIN', 'MANAGER', 'STAFF']),
});

export const updateUserStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'INACTIVE']),
});

// Invite validation schemas
export const createInviteSchema = z.object({
  email: z.string().email('Invalid email format'),
  role: z.enum(['ADMIN', 'MANAGER', 'STAFF']),
});

// Project validation schemas
export const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').optional(),
  description: z.string().optional(),
  status: z.enum(['ACTIVE', 'ARCHIVED', 'DELETED']).optional(),
});

// Token validation
export const tokenSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

// ID validation
export const idSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});