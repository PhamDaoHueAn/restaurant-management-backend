import express from 'express'
import { createPayment, getPayments } from '../controllers/paymentController.js'

const router = express.Router()

router.route('/').get(getPayments).post(createPayment)

export default router
