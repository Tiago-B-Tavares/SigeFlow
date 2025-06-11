import { Request, Response } from 'express';
import supplyService from '../services/supply.service';
import { supplySchema } from '../schemas/supply.schema';
import { formatResponse } from '../utils/FormatResponse';
import { AppError } from '../utils/AppError';


const supplyController = {


  async getSupplies(req: Request, res: Response) {
    try {
      const supplies = await supplyService.getAllSupplies();
      res.status(200).json(supplies);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching supplies' });
    }
  },

  async createSupplies(req: Request, res: Response) {
    const {
      name, unit, minStock, contractId } = req.body;

    const validation = supplySchema.safeParseAsync({
      name, unit, minStock, contractId
    });
    if (!(await validation).success) {
      res.status(400).json({ errors: (await validation).error });
      return;
    }
    try {
      const supplyCreated = await supplyService.createSupply({ name, unit, minStock, contractId });
      res.status(200).json(formatResponse(200, 'Produto criado com sucesso!', supplyCreated));
      return;
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      } else {
        next(error);
      }
    }
  },

};

export default supplyController;
function next(error: unknown) {
  throw new Error('Function not implemented.');
}

