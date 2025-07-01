import express from 'express'
import {
  loginUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/profile', protect, getUserProfile)

export default router
