import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { $Enums } from '@prisma/client';

type MovementType = $Enums.MovementType;

interface StockMovement {
  type: MovementType,
  quantity: number,
  date: Date,
  note?: string,
  supplyId: string,
}

const StockMovementModel = {


  async createMoviment({ type, quantity, date, note, supplyId }: StockMovement) {
    try {
      const newMoviment = await prisma.stockMovement.create({
        data: {
          type,
          quantity,
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
  async getMovimentByType(type: MovementType) {
    try {
      const getMoviment = await prisma.stockMovement.findMany({
        where: {
          type: {
            in: [type]
          }
        },
        orderBy: {
          type: 'asc',
        },
        include: {
          supply: {
            select: {
              id: true,
              name: true,
              unit: true,
             minStock: true,
             createdAt: true,
            },
          }
        }
      });
      return getMoviment;
    } catch (error: any) {
      throw new Error('Error fetching supplies: ' + error.message);
    }
  }



};

export default StockMovementModel;
