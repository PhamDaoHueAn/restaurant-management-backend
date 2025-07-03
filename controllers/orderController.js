import asyncHandler from 'express-async-handler'
import { Order } from '../models/orderModel.js'
import { OrderItem } from '../models/orderItemModel.js'
import { MenuItem } from '../models/menuItemModel.js'
import mongoose from 'mongoose'


export const createOrder = asyncHandler(async (req, res) => {
  const { table, orderItems } = req.body
  let totalAmount = 0
  const createdOrderItems = []
  for (const item of orderItems) {
    const menu = await MenuItem.findById(item.menuItem)
    if (!menu) {
      res.status(400)
      throw new Error('Invalid menu item')
    }

    totalAmount += menu.price * item.quantity

    const createdItem = await OrderItem.create({
      menuItem: menu._id,
      quantity: item.quantity,
    })
  
    createdOrderItems.push(createdItem._id)
  }
  
  const order = await Order.create({
    table,
    orderItems: createdOrderItems,
    totalAmount,
    status: 'pending',
  })
  res.status(201).json(order)
})

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('orderItems')
    .populate({ path: 'table', select: 'tableNumber' })
  res.json(orders)
})

export const getOrderDetails = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Invalid order ID')
  }
  const order = await Order.findById(id)
    .populate('orderItems')
    .populate('table')
  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }
  res.json(order)
})

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  const order = await Order.findById(id)
  if (order) {
    order.status = status
    await order.save()
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    await order.deleteOne()
    res.json({ message: 'Order deleted' })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
