// routes/index.ts
import { Router } from 'express'
import supplyRoutes from './supply.routes'
import supplierRoutes from './supplier.routes'
import movementRoutes from './movement.routes'
import contractRoutes from './contract.routes'

const router = Router()

router.use('/supplies', supplyRoutes)
router.use('/suppliers', supplierRoutes)
router.use('/movements', movementRoutes) 
router.use('/contracts', contractRoutes) 

export default router
