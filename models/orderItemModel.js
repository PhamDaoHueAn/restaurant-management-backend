import mongoose from 'mongoose'
const orderItemSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: false },
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  quantity: { type: Number, required: true },
  note: { type: String },
}, { timestamps: true })

export const OrderItem = mongoose.model('OrderItem', orderItemSchema)
