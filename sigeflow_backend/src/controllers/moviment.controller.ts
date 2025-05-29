import { Request, Response } from 'express';
import movimentService from '../services/moviment.service';





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

 
};

export default StockMovement;
