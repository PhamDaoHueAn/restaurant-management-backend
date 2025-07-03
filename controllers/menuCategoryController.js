import { MenuCategory } from '../models/menuCategoryModel.js'

export const getCategories = async (req, res) => {
  const categories = await MenuCategory.find()
  res.json(categories)
}

export const createCategory = async (req, res) => {
  const { name } = req.body
  const category = new MenuCategory({ name })
  const created = await category.save()
  res.status(201).json(created)
}

export const updateCategory = async (req, res) => {
  const { name } = req.body
  const category = await MenuCategory.findById(req.params.id)
  if (category) {
    category.name = name || category.name
    const updated = await category.save()
    res.json(updated)
  } else {
    res.status(404).json({ message: 'Category not found' })
  }
}

export const deleteCategory = async (req, res) => {
  const category = await MenuCategory.findById(req.params.id)
  if (category) {
    await category.deleteOne()
    res.json({ message: 'Category removed' })
  } else {
    res.status(404).json({ message: 'Category not found' })
  }
}
