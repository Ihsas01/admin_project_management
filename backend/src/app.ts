import express from 'express';
import cors from 'cors';
import { PORT } from '@/config/environment';

// Import routes
import authRoutes from '@/modules/auth/routes';
import userRoutes from '@/modules/users/routes';
import projectRoutes from '@/modules/projects/routes';

// Import middlewares
import { errorHandler } from '@/middlewares/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

export default app;