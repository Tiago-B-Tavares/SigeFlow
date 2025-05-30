import prisma from '../prisma/prismaClient';

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
      throw new Error('Error fetching supplies: ' + error.message);
    }
  },
};

export default Supplier;
