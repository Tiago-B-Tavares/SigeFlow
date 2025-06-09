import { Prisma } from '@prisma/client';
import { AppError } from './AppError';

export function handlePrismaError(error: Error): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint
    if (error.code === 'P2002') {
      
       const campo = Array.isArray(error.meta?.target) && error.meta.target.length > 0
        ? error.meta.target[0]
        : 'campo desconhecido';
      throw new AppError(`Já existe um registro com o campo '${campo}'`, 409);
    }

    // Foreign key constraint
    if (error.code === 'P2003') {
      throw new AppError('Violação de integridade referencial (foreign key)', 400);
    }

    // Record not found
    if (error.code === 'P2025') {
      //nessa validação eu vejo se nao retornou undefined  antes de retornar a mensagem de erro para que nao caia no middleware de erro global
      const campo = Array.isArray(error.meta?.target) && error.meta.target.length > 0
        ? error.meta.target[0]
        : 'identificador';
      throw new AppError(`Nenhum valor encontrado para o campo '${campo}'`, 404);
    }
  }

  // Caso o erro não seja tratado acima
  throw new AppError('Erro inesperado no banco de dados', 500);
}
