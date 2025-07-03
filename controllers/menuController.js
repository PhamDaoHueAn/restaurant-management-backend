import asyncHandler from 'express-async-handler'
import { MenuItem } from '../models/menuItemModel.js'
import { MenuCategory } from '../models/menuCategoryModel.js'

export const getMenuItems = asyncHandler(async (req, res) => {
  const items = await MenuItem.find().populate('category')
  res.json(items)
})

export const createMenuItem = asyncHandler(async (req, res) => {
  const { name, price, category, description } = req.body
  const item = await MenuItem.create({ name, price, category, description })
  res.status(201).json(item)
})

export const updateMenuItem = asyncHandler(async (req, res) => {
  const { name, price, category, description } = req.body
  const item = await MenuItem.findById(req.params.id)
  if (item) {
    item.name = name || item.name
    item.price = price || item.price
    item.category = category || item.category
    item.description = description || item.description
    await item.save()
    res.json(item)
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})

export const deleteMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findById(req.params.id)
  if (item) {
    await item.deleteOne()
    res.json({ message: 'Item deleted' })
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})

export const getItemsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params
  const items = await MenuItem.find({ category: categoryId }).populate('category')
  res.json(items)
})