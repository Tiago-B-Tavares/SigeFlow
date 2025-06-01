import prisma from '../utils/prismaConfig/prismaClient';





interface StockMovement {
  type: 'entrada' | 'saida',

  date: Date,
  note?: string,
  supplyId: string,
}

const StockMovementModel = {


  async createMoviment({ type,  date, note, supplyId }: StockMovement) {
    try {
      const newMoviment = await prisma.stockMovement.create({
        data: {
          type,
         
          date: new Date(date),
          note:"",
          supply: {
            connect: {
              id: supplyId
            }
          }
        },
      });
      console.log(newMoviment);
      // Atualiza o estoque do insumo
      
      return newMoviment;
    } catch (error: any) {
      throw new Error('Error creating supply: ' + error.message);
    }
  },
};

export default StockMovementModel;
