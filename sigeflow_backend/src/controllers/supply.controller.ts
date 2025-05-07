import { Request, Response } from 'express';
import supplyService from '../services/supply.service';


const supplyController = {

  // Rota para buscar todos os insumos
  async getSupplies(req: Request, res: Response) {
    try {
      const supplies = await supplyService.getAllSupplies();
      res.status(200).json(supplies); 
    } catch (error) {
      res.status(500).json({ message: 'Error fetching supplies' });
    }
  },

 async createSupplies(req: Request, res: Response) {
    try {
      const newSupply = await supplyService.createSupply(req.body);
      
      res.status(201).json(newSupply);
    } catch (error) {
      console.error('Error creating supply:', error);
      res.status(500).json({ message: 'Error creating supply' });
    }
  },
 
};

export default supplyController;
