import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '@/utils/response';
import { AppError, NotFoundError } from '@/utils/errors';
import prisma from '@/config/db';

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body;
    const currentUser = (req as any).user;

    // Create project
    const project = await prisma.project.create({
      data: {
        name,
        description,
        status: 'ACTIVE',
        isDeleted: false,
        createdById: currentUser.id,
      },
    });

    res.status(201).json(
      sendSuccess(
        { project },
        'Project created successfully'
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = (req as any).user;
    
    // Filter out soft-deleted projects
    const projects = await prisma.project.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json(
      sendSuccess(
        { projects },
        'Projects fetched successfully'
      )
    );
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    const project = await prisma.project.findUnique({
      where: { id },
    });
    
    if (!project) {
      throw new NotFoundError('Project');
    }

    // Update project
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
      },
    });

    res.status(200).json(
      sendSuccess(
        { project: updatedProject },
        'Project updated successfully'
      )
    );
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
    });
    
    if (!project) {
      throw new NotFoundError('Project');
    }

    // Soft delete
    await prisma.project.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    res.status(200).json(
      sendSuccess(
        { projectId: id },
        'Project deleted successfully'
      )
    );
  } catch (error) {
    next(error);
  }
};
