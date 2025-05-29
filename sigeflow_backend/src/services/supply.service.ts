import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

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
      
      // const createdSupply = await prisma.supply.create({
      //   data: {
      //     name,
      //     unit,
      //     minStock,
      //     contractId,
      //   },
      // });
      // return createdSupply;
    } catch (error: any) {
      throw new Error('Error creating supply: ' + error.message);
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
