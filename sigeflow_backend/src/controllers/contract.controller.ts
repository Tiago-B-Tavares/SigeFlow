import { Request, Response, NextFunction } from "express";
import contractService from "../services/contract.service";
import { AppError } from "../utils/AppError";
import { createContractSchema, updateContractSchema } from "../schemas/contract.schema";


const contractController = {

  async createContract(req: Request, res: Response, next: NextFunction) {

    const { supplierId, number, startDate, endDate } = req.body;
    const validation = createContractSchema.safeParseAsync({
      supplierId,
      number,
      startDate,
      endDate,
    });
    if (!(await validation).success) {
      res.status(400).json({ errors: (await validation).error });
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
  },

  async getContractById(req: Request, res: Response, next: NextFunction) {
    const id = req.query.id as string

    if (!id) {
      res.status(400).json({ message: "id não recebido!" })
    }

    try {

      const contract = await contractService.getContractById(id);

      res.status(200).json(contract);

    } catch (error) {

      if (error instanceof AppError) {

        res.status(error.statusCode).json({ message: error.message });

      }
      next(error);
    }
  },
  
  async updateContract(req: Request, res: Response, next: NextFunction) {
  const id = req.query.id as string;

  if (!id) {
     res.status(400).json({ message: "ID não recebido!" }); // Adicionado return
     return
  }

  const { supplierId, number, startDate, endDate } = req.body;
  
  try {
    
    const validation = await updateContractSchema.safeParseAsync({
      id, 
      number,
      startDate,
      endDate,
    });

    if (!validation.success) { 
       res.status(400).json({ 
        message: "Dados inválidos",
        errors: validation.error.flatten() 
      });
      return
    }

    const updatedContract = await contractService.updateContract({ 
      id, 
      supplierId, 
      number, 
      startDate, 
      endDate 
    });

     res.status(200).json(updatedContract);
     return

  } catch (error: any) {
    if (error instanceof AppError) {
       res.status(error.statusCode).json({ message: error.message });
    }
     next(error);
  }
}


};

export default contractController;
