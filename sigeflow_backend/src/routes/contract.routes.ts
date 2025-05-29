import { Router } from 'express';

import { logger } from '../middlewares/logger';
import contractController from '../controllers/contract.controller';

const router = Router();


router.post('/', contractController.createContract);



export default router;
