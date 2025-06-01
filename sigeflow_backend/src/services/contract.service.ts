import prisma from '../utils/prismaConfig/prismaClient';
import { AppError } from '../utils/AppError';

import { Contract } from '@prisma/client';
import { handlePrismaError } from '../utils/handlePrismaError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';



type CreateContractInput = {
  number: string;
  startDate: Date;
  endDate: Date;
  supplierId: string;
};


const contractService = {

  async createContract({
    number,
    startDate,
    endDate,
    supplierId,
  }: CreateContractInput): Promise<Contract> {
    try {
      const createdContract = await prisma.contract.create({
        data: { number, startDate, endDate, supplierId },
      });

      return createdContract;
    } catch (error) {

      if (error instanceof PrismaClientKnownRequestError) {
        handlePrismaError(error);
      }
      throw new AppError('Failed to create contract', 500);
    }
  },
  async getContracts() {
    try {
      const contractsList = await prisma.contract.findMany();
      return contractsList;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        handlePrismaError(error);
      }
      throw new AppError('Failed to fetch contracts', 500);
    }
  },

  async getContractById(id: string): Promise<Contract> {
  try {
    const contract = await prisma.contract.findUniqueOrThrow({
      where: { id },
    });
    return contract;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      handlePrismaError(error);
    }
    throw new AppError('Contrato não encontrado', 404);
  }
}
,
  async updateContract() {

  },
  async updateContractPartial() {

  },
  async deleteContract() {

  }

};

export default contractService;
