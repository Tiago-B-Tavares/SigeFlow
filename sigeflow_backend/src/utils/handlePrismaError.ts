import { Prisma } from '@prisma/client';
import { AppError } from './AppError';

export function handlePrismaError(error: Error): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint
    if (error.code === 'P2002') {
      const campo = (error.meta?.target as string[])[0];
      throw new AppError(`Já existe um registro com o campo '${campo}'`, 409);
    }


    if (error.code === 'P2003') {
      throw new AppError('Foreign key constraint failed', 400);
    }


  }

  // Fallback error
  throw new AppError('Unexpected database error', 500);
}
