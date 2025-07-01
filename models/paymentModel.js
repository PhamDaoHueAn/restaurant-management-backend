import mongoose from 'mongoose'
const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['cash', 'card'], default: 'cash' },
}, { timestamps: true })

export const Payment = mongoose.model('Payment', paymentSchema)