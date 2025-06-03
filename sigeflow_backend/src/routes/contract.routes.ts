import { Router } from 'express';
import contractController from '../controllers/contract.controller';

const router = Router();

/**
 * @swagger
 * /contracts/list:
 *   get:
 *     summary: Retorna todos os contratos
 *     tags: [Contracts]
 *     responses:
 *       200:
 *         description: Lista de contratos
 */
router.get('/list', contractController.getContracts);

/**
 * @swagger
 * /contracts:
 *   post:
 *     summary: Cria um novo contrato
 *     tags: [Contracts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplierId:
 *                 type: string
 *               number:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Contrato criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post('/', contractController.createContract);

/**
 * @swagger
 * /contracts:
 *   get:
 *     summary: Busca um contrato por ID
 *     tags: [Contracts]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID do contrato
 *     responses:
 *       200:
 *         description: Contrato encontrado
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Contrato não encontrado
 */
router.get('/', contractController.getContractById);

/**
 * @swagger
 * /contracts:
 *   get:
 *     summary: Atualiza todos os dados do contrato por completo
 *     tags: [Contracts]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID do contrato
 *     responses:
 *       200:
 *         description: Contrato atualizado com sucesso
 *       400:
 *         description: Dados da requisição invalidos
 *      
 */
router.put('/', contractController.updateContract);

export default router;
