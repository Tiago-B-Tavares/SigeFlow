import { Router } from 'express';
import StockMovement from '../controllers/moviment.controller';



const router = Router();

router.post('/', StockMovement.createMoviment);





export default router;
