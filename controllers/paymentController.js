import asyncHandler from 'express-async-handler'
import { Payment } from '../models/paymentModel.js'

export const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find()
  res.json(payments)
})

export const createPayment = asyncHandler(async (req, res) => {
  const { order, amount, method } = req.body
  const payment = await Payment.create({ order, amount, method })
  res.status(201).json(payment)
})
