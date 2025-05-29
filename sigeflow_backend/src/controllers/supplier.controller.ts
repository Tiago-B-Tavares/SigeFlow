import { Request, Response } from 'express';
import Supplier from '../services/supplier.service';



const supplierController = {

  
  async getSuppliers(req: Request, res: Response) {
    try {

    } catch (error) {

    }
  },

  async createSupplier(req: Request, res: Response) {

    if (!req.body || !req.body.name || !req.body.documentNumber) {
     res.status(400).json({ error: 'Name and document number are required' });
      return;
    }

    try {
      const { name, documentNumber } = req.body;
      const createdSupply = await Supplier.createSupplier({
        name,
        documentNumber,
      });
      res.status(201).json(createdSupply);
    } catch (error: any) {
      if (error.message.includes('already exists')) {
         res.status(409).json({ message: error.message });
      }
       res.status(500).json({ message: 'Internal server error' });
    }
  }, 

};

export default supplierController;
