import { request, Router } from 'express';


import contractController from '../controllers/contract.controller';


const router = Router();


router.post('/', contractController.createContract);
router.get('/list', contractController.getContracts);
router.get('/', contractController.getContractById);



export default router;
