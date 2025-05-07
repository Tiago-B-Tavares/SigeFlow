import { PrismaClient } from '@prisma/client';
import { log } from 'console';

const prisma = new PrismaClient();

interface Supply {
  id:string, 
  name:string,
  unit:string,
  minStock: number,
  contractNumber: string,
  supplierName: string,
}

const supplyModel = {
  
  async createSupply( {name, unit, minStock, contractNumber, supplierName} : Supply) {
    try {
      const newSupply = await prisma.supply.create({
        data: {
          name, 
          unit, 
          minStock, 
          contractNumber, 
          supplierName
        },
      });
      console.log(newSupply);
      return newSupply;
    } catch (error: any) {
      throw new Error('error creating supply: ' + error.message);
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
