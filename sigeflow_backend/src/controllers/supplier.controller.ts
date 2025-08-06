import { Request, Response } from 'express';
import Supplier from '../services/supplier.service';
import { formatResponse } from '../utils/FormatResponse';



const supplierController = {


  async getSupplier(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const supplier = await Supplier.getSupplier(id);
      res.status(200).json(formatResponse(200, '', supplier));
    } catch (error: any) {
      
      res.status(500).json({ message: 'Internal server error' });
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
