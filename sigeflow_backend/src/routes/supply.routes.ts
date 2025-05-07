import { Router } from 'express';
import supplyController from '../controllers/supply.controller';
import { logger } from '../middlewares/logger';

const router = Router();

router.get('/', supplyController.getSupplies);
router.post('/',logger, supplyController.createSupplies);



export default router;
