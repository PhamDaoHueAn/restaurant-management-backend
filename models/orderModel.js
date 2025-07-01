import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema({
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
  status: { type: String, enum: ['pending', 'served', 'paid'], default: 'pending' },
  totalAmount: { type: Number, required: true, default: 0 },
}, { timestamps: true })

export const Order = mongoose.model('Order', orderSchema)