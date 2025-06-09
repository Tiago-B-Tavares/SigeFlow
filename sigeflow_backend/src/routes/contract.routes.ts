import { Router } from 'express';
import contractController from '../controllers/contract.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Contracts
 *     description: Gerenciamento de contratos
 */

/**
 * @swagger
 * /contracts/list:
 *   get:
 *     summary: Retorna todos os contratos
 *     tags: [Contracts]
 *     responses:
 *       200:
 *         description: Contratos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Contrato encontrado!
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: 55baa50d-ef08-4eaa-8056-0fb285d10798
 *                       number:
 *                         type: string
 *                         example: "31"
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-05-29T00:00:00.000Z
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-06-20T00:00:00.000Z
 *                       supplierId:
 *                         type: string
 *                         format: uuid
 *                         example: 4ba81e11-ac70-4def-a238-4db333a2db87
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
 *             required:
 *               - supplierId
 *               - number
 *               - startDate
 *               - endDate
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
router.get('/:id', contractController.getContractById);

/**
 * @swagger
 * /contracts:
 *   put:
 *     summary: Atualiza todos os dados do contrato por completo
 *     tags: [Contracts]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do contrato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - supplierId
 *               - number
 *               - startDate
 *               - endDate
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
 *       200:
 *         description: Contrato atualizado com sucesso
 *       400:
 *         description: Dados da requisição inválidos
 */
router.put('/:id', contractController.updateContract);

/**
 * @swagger
 * /contracts:
 *   patch:
 *     summary: Atualiza apenas os campos específicos enviados
 *     tags: [Contracts]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do contrato
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
 *       200:
 *         description: Contrato atualizado com sucesso
 *       400:
 *         description: Dados da requisição inválidos
 */
router.patch('/:id', contractController.updateContractPartial);
/**
 * @swagger
 * /contracts:
 *   delete:
 *     summary: Deleta um contrato pelo ID
 *     tags: [Contracts]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do contrato a ser deletado
 *     responses:
 *       200:
 *         description: Contrato deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Deletado com sucesso!
 *       400:
 *         description: Erro ao tentar deletar contrato
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Erro ao tentar deletar contrato
 *       404:
 *         description: Contrato não encontrado
 */

router.delete('/', contractController.deleteContract);
export default router;
