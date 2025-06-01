import { Request, Response, NextFunction } from "express";
import contractService from "../services/contract.service";
import contractSchema from "../schemas/contract.schema";
import { AppError } from "../utils/AppError";

const contractController = {

  async createContract(req: Request, res: Response, next: NextFunction) {

    const { supplierId, number, startDate, endDate } = req.body;
    const validation = contractSchema.safeParse({
      supplierId,
      number,
      startDate,
      endDate,
    });
    if (!validation.success) {
      res.status(400).json({ errors: validation.error.format() });
    }

    try {

      const createdContract = await contractService.createContract({
        supplierId,
        number,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      });

      res.status(201).json(createdContract);

    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        next(error);
      }
    }
  },

  async getContracts(req: Request, res: Response, next: NextFunction) {
    try {
      const contractsList = await contractService.getContracts()
       res.status(200).json(contractsList);
    } catch (error) {
      if (error instanceof AppError) {
         res.status(error.statusCode).json({ message: error.message });
      } else {
        next(error);
      }
    }
  }
};

export default contractController;
