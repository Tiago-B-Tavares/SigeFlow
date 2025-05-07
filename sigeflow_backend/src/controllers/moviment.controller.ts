import { Request, Response } from 'express';
import movimentService from '../services/moviment.service';
import { MovementType } from '@prisma/client';




const StockMovement = {
  // Rota para buscar todos os insumos


 async createMoviment(req: Request, res: Response) {
    try {
      const newMoviment = await movimentService.createMoviment(req.body);
      res.status(201).json(newMoviment);
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ message: 'Error creating supply' });
    }
  },
  async getMoviment(req: Request, res: Response) {
    try {
      const { type } = req.params;
      const movementType = type as MovementType;
      const moviment = await movimentService.getMovimentByType(movementType);
      res.status(200).json(moviment);

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error fetching supply' });
    }
  }
,  

 
};

export default StockMovement;
