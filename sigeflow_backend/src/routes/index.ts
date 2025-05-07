// routes/index.ts
import { Router } from 'express'
import supplyRoutes from './supply.routes'
import movementRoutes from './movement.routes'

const router = Router()

router.use('/supplies', supplyRoutes)
router.use('/movements', movementRoutes)  // ex: GET /api/movements

export default router
