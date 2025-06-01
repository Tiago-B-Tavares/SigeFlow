// routes/index.ts
import { Router } from 'express'
import supplyRoutes from './supply.routes'
import supplierRoutes from './supplier.routes'
import movementRoutes from './movement.routes'
import contractRoutes from './contract.routes'
import { globalErrorHandler } from '../middlewares/globalErrorHandler'


const router = Router()

router.use('/supplies', supplyRoutes)
router.use('/suppliers', supplierRoutes)
router.use('/movements', movementRoutes)
router.use('/contracts', contractRoutes)

//Manipulador global de erros
router.use(globalErrorHandler);


export default router
