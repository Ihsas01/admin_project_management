import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '@/utils/response';
import { AppError, NotFoundError } from '@/utils/errors';
import prisma from '@/config/db';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await prisma.user.count();

    res.status(200).json(
      sendSuccess(
        {
          users: users.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt
          })),
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        },
        'Users fetched successfully'
      )
    );
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await prisma.user.findUnique({
      where: { id },
    });
    
    if (!user) {
      throw new NotFoundError('User');
    }

    // Update user role
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    });

    res.status(200).json(
      sendSuccess(
        { user: updatedUser },
        'User role updated successfully'
      )
    );
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status: newStatus } = req.body;

    const user = await prisma.user.findUnique({
      where: { id },
    });
    
    if (!user) {
      throw new NotFoundError('User');
    }

    // Update user status
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { status: newStatus },
    });

    res.status(200).json(
      sendSuccess(
        { user: updatedUser },
        'User status updated successfully'
      )
    );
  } catch (error) {
    next(error);
  }
};