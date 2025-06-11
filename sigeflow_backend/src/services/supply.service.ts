import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError } from '../utils/AppError';
import { handlePrismaError } from '../utils/handlePrismaError';
import prisma from '../utils/prismaConfig/prismaClient';
interface Supply {
  name: string;
  unit: string;
  minStock: number;
  contractId: string;

}

const supplyModel = {

  async createSupply({ name, unit, minStock, contractId }: Supply) {

    try {
      console.log(name, unit, minStock, contractId);
      
      const createdSupply = await prisma.supply.create({
        data: {
          name,
          unit,
          minStock,
          contractId,
        },
      });
      return createdSupply;
    } catch (error: any) {
       console.log(error);
        if (error instanceof PrismaClientKnownRequestError) {
             handlePrismaError(error);
           }
           throw new AppError('Contrato não encontrado', 404);
    }

  },
  async getAllSupplies() {
    try {
      const supplies = await prisma.supply.findMany();
      return supplies;
    } catch (error: any) {
      throw new Error('Error fetching supplies: ' + error.message);
    }
  },
};

export default supplyModel;
