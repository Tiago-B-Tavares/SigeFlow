import { Router } from 'express';
import StockMovement from '../controllers/moviment.controller';



const router = Router();

router.post('/', StockMovement.createMoviment);
router.get('/:type', StockMovement.getMoviment);




export default router;
