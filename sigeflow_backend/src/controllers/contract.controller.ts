import { Request, Response, NextFunction } from "express";
import contractService from "../services/contract.service";
import { AppError } from "../utils/AppError";
import {
  createContractSchema,
  updateContractSchema,
  updateContractPartialSchema
} from "../schemas/contract.schema";
import { formatResponse } from "../utils/FormatResponse";


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

      res.status(200).json(formatResponse(200, 'Contrato criado com sucesso!', createdContract));

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
      res.status(200).json(formatResponse(200, 'Contrato encontrado!', contractsList));
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        next(error);
      }
    }
  },

  async getContractById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string

    if (!id) {
      res.status(400).json({ message: "id não recebido!" })
    }

    try {

      const contract = await contractService.getContractById(id);

      res.status(200).json(formatResponse(200, 'Contrato encontrado!', contract));


    } catch (error) {

      if (error instanceof AppError) {

        res.status(error.statusCode).json({ message: error.message });

      }
      next(error);
    }
  },

  async updateContract(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string;

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

      res.status(200).json(formatResponse(200, 'Atualizado com sucesso', updatedContract));



    } catch (error: any) {

      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      }
      next(error);
    }
  },

  async updateContractPartial(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string;

    if (!id) {
      res.status(400).json({ message: "ID não recebido!" }); // Adicionado return
      return
    }

    const { supplierId, number, startDate, endDate } = req.body;

    try {

      const validation = await updateContractPartialSchema.safeParseAsync({
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

      const updatedContract = await contractService.updateContractPartial({
        id,
        supplierId,
        number,
        startDate,
        endDate
      });

      res.status(200).json(formatResponse(200, 'Atualizado com sucesso', updatedContract));

      return
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      }
      next(error);
    }
  },

  async deleteContract(req: Request, res: Response, next: NextFunction) {
    const id = req.query.id as string;
    try {

      if (!id) {
        res.status(400).json(formatResponse(400, 'é necessário informar o id do contrato'));
        return
      }
      const deleteContract = await contractService.deleteContract(id)

      res.status(200).json(formatResponse(200, 'Deletado com sucesso!'));
      return
    }
    catch (error) {
      if (error instanceof AppError) {
        res.status(400).json(formatResponse(400, 'Erro ao tentar deletar contrato'));
      }
      next(error);
    }
  }
};
export default contractController;
