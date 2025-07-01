import express from 'express'
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getItemsByCategory
} from '../controllers/menuController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getMenuItems)
router.post('/', protect, isAdmin, createMenuItem)
router.put('/:id', protect, isAdmin, updateMenuItem)
router.delete('/:id', protect, isAdmin, deleteMenuItem)
router.get('/category/:categoryId', getItemsByCategory)

export default router
