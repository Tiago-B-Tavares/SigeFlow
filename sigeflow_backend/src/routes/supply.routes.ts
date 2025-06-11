import { Router } from 'express';
import supplyController from '../controllers/supply.controller';
import { logger } from '../middlewares/logger';

const router = Router();

router.get('/', supplyController.getSupplies);


/**
 * @swagger
 * /supplies:
 *   post:
 *     summary: Adiciona um novo suprimento
 *     tags: [Supplies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - unit
 *               - minStock
 *               - contractId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Milho
 *               unit:
 *                 type: string
 *                 example: kg
 *               minStock:
 *                 type: number
 *                 example: 100
 *               contractId:
 *                 type: string
 *                 format: uuid
 *                 example: a2fa11ba-cb87-411f-b1b9-753bab841e2c
 *     responses:
 *       201:
 *         description: Suprimento criado com sucesso!
 *       400:
 *         description: Erro de validação nos dados fornecidos
 */


router.post('/',logger, supplyController.createSupplies);



export default router;
