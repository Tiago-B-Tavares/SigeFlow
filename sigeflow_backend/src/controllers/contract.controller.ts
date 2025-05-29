import { Request, Response } from "express";
import contractService from "../services/contract.service";

const contractController = {
  async createContract(req: Request, res: Response) {
    
    const {supplierId, number, startDate, endDate } = req.body;

    // Validação básica
    if (!supplierId || !number || !startDate) {
       res.status(400).json({
        message: "supplierId, number and startDate are required",
      });
      return
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
      res.status(500).json({
        message: error.message,
      });
    }
  },
};

export default contractController;
