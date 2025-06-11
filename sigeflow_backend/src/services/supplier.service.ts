import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import prisma from '../utils/prismaConfig/prismaClient';
import { handlePrismaError } from '../utils/handlePrismaError';
import { AppError } from '../utils/AppError';

interface Supplier {
  name: string;
  documentNumber: string;
}

const Supplier = {

  async createSupplier({ name, documentNumber }: Supplier) {
    try {
      const createdSupplier = await prisma.supplier.create({
        data: { name, documentNumber },
      });
      return createdSupplier;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new Error('Supplier with this document number already exists.');
      }
      throw error;
    }
  }
  ,
  async getAllSupplies() {
    try {
      const supplies = await prisma.supply.findMany();
      return supplies;
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
             handlePrismaError(error);
           }
           throw new AppError('Erro ao buscar lista de insumos', 400);
    }
  },
};

export default Supplier;
