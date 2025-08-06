import { Router } from 'express';
import { logger } from '../middlewares/logger';
import supplierController from '../controllers/supplier.controller';

const router = Router();

router.get('/:id', supplierController.getSupplier);
router.post('/',logger, supplierController.createSupplier);



export default router;
