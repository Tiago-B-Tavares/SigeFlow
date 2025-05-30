import { Prisma } from '@prisma/client';
import { AppError } from './AppError';

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint
    if (error.code === 'P2002') {
      throw new AppError('Unique constraint failed: duplicate entry', 409);
    }

    // Foreign key constraint
    if (error.code === 'P2003') {
      throw new AppError('Foreign key constraint failed', 400);
    }

    // Add more error codes as needed
  }

  // Fallback error
  throw new AppError('Unexpected database error', 500);
}
