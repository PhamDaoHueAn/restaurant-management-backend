import express from 'express'
import {
  getTables,
  updateTableStatus,
  deleteTable
} from '../controllers/tableController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/', protect, getTables)
router.put('/:id/status', protect, updateTableStatus)
router.delete('/:id', protect, isAdmin, deleteTable)

export default router