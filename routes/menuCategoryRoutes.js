import express from 'express'
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory
} from '../controllers/menuCategoryController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/', getCategories)
router.post('/', protect, isAdmin, createCategory)
router.put('/:id', protect, isAdmin, updateCategory)
router.delete('/:id', protect, isAdmin, deleteCategory)

export default router