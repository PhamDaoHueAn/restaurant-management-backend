import asyncHandler from 'express-async-handler'
import { OrderItem } from '../models/orderItemModel.js'
import { MenuItem } from '../models/menuItemModel.js'
import { updateTotalAmount } from '../utils/updateTotalAmount.js'

export const getOrderItems = asyncHandler(async (req, res) => {
  const items = await OrderItem.find().populate('menuItem', 'name price')
  res.json(items)
})

export const getOrderItemById = asyncHandler(async (req, res) => {
  const item = await OrderItem.findById(req.params.id).populate('menuItem', 'name price')
  if (item) {
    res.json(item)
  } else {
    res.status(404)
    throw new Error('Order item not found')
  }
})

export const createOrderItem = asyncHandler(async (req, res) => {
  const { order, menuItem, quantity } = req.body

  const menu = await MenuItem.findById(menuItem)
  if (!menu) {
    res.status(400)
    throw new Error('Invalid menu item')
  }

  const item = await OrderItem.create({ order, menuItem, quantity })

  await updateTotalAmount(order) 

  res.status(201).json(item)
})


export const updateOrderItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body
  const item = await OrderItem.findById(req.params.id)

  if (item) {
    item.quantity = quantity || item.quantity
    const updatedItem = await item.save()

    await updateTotalAmount(item.order) 

    res.json(updatedItem)
  } else {
    res.status(404)
    throw new Error('Order item not found')
  }
})

export const deleteOrderItem = asyncHandler(async (req, res) => {
  const item = await OrderItem.findById(req.params.id)
  if (item) {
    const orderId = item.order
    await item.deleteOne()

    await updateTotalAmount(orderId) 

    res.json({ message: 'Order item deleted' })
  } else {
    res.status(404)
    throw new Error('Order item not found')
  }
})
