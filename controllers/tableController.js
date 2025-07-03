import asyncHandler from 'express-async-handler'
import { Table } from '../models/tableModel.js'

export const getTables = asyncHandler(async (req, res) => {
  const tables = await Table.find()
  res.json(tables)
})

export const createTable = asyncHandler(async (req, res) => {
  const { tableNumber } = req.body
  const table = await Table.create({ tableNumber })
  res.status(201).json(table)
})

export const updateTableStatus = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  const table = await Table.findById(id)
  if (table) {
    table.status = status
    await table.save()
    res.json(table)
  } else {
    res.status(404)
    throw new Error('Table not found')
  }
})

export const deleteTable = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id)
  if (table) {
    await table.deleteOne()
    res.json({ message: 'Table removed' })
  } else {
    res.status(404)
    throw new Error('Table not found')
  }
})
