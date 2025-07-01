import express from 'express'
import {
  getOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem
} from '../controllers/orderItemController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getOrderItems)
router.post('/', protect, createOrderItem)
router.get('/:id', protect, getOrderItemById)
router.put('/:id', protect, updateOrderItem)
router.delete('/:id', protect, deleteOrderItem)

export default router
