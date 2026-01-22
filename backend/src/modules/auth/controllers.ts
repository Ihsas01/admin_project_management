import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword, generateToken, comparePassword } from '@/utils/auth';
import { sendSuccess, sendError } from '@/utils/response';
import { AppError, UnauthorizedError, NotFoundError } from '@/utils/errors';
import prisma from '@/config/db';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedError('Account is deactivated');
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken({ 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    });

    res.status(200).json(
      sendSuccess(
        { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } },
        'Login successful'
      )
    );
  } catch (error) {
    next(error);
  }
};

export const createInvite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, role } = req.body;
    const currentUser = (req as any).user;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new AppError('User with this email already exists', 400);
    }

    // Check if invite already exists
    const existingInvite = await prisma.invite.findFirst({
      where: { 
        email,
        acceptedAt: null // Not yet accepted
      },
    });
    if (existingInvite) {
      throw new AppError('Invite already sent to this email', 400);
    }

    // Create invite
    const invite = await prisma.invite.create({
      data: {
        email,
        role,
        token: uuidv4(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        invitedById: (req as any).user.id,
      },
    });

    res.status(201).json(
      sendSuccess(
        { invite: { id: invite.id, email: invite.email, role: invite.role } },
        'Invite created successfully'
      )
    );
  } catch (error) {
    next(error);
  }
};

export const registerViaInvite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, name, password } = req.body;

    // Validate input
    if (!token || !name || !password) {
      throw new AppError('Token, name, and password are required', 400);
    }

    // Find invite
    const invite = await prisma.invite.findFirst({
      where: {
        token,
        acceptedAt: null, // Not yet accepted
      },
    });
    
    if (!invite) {
      throw new NotFoundError('Invalid or expired invite token');
    }

    // Check if invite is expired
    if (invite.expiresAt < new Date()) {
      throw new AppError('Invite token has expired', 400);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: invite.email },
    });
    if (existingUser) {
      throw new AppError('User with this email already exists', 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email: invite.email,
        password: hashedPassword,
        role: invite.role,
        status: 'ACTIVE',
        invitedAt: new Date(),
      },
    });

    // Mark invite as accepted
    await prisma.invite.update({
      where: { id: invite.id },
      data: { acceptedAt: new Date() },
    });

    // Generate JWT token
    const authToken = generateToken({ 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    });

    res.status(201).json(
      sendSuccess(
        { token: authToken, user: { id: user.id, name: user.name, email: user.email, role: user.role } },
        'Registration successful'
      )
    );
  } catch (error) {
    next(error);
  }
};