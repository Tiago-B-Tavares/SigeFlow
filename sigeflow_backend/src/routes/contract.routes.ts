import { request, Router } from 'express';


import contractController from '../controllers/contract.controller';


const router = Router();


router.post('/', contractController.createContract);



export default router;
