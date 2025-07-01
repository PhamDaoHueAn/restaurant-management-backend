import express from 'express'
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
  getOrderDetails
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/', protect, createOrder)
router.get('/', protect, getOrders)
router.get('/:id', protect, getOrderDetails)
router.put('/:id/status', protect, updateOrderStatus)
router.delete('/:id', protect, deleteOrder)

export default router