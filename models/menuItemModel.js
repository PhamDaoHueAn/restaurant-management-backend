import mongoose from 'mongoose'
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuCategory' },
  description: { type: String },
}, { timestamps: true })

export const MenuItem = mongoose.model('MenuItem', menuItemSchema)
