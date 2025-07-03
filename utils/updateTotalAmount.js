import { OrderItem } from '../models/orderItemModel.js'
import { MenuItem } from '../models/menuItemModel.js'
import { Order } from '../models/orderModel.js'


export const updateTotalAmount = async (orderId) => {
    const orderItems = await OrderItem.find({ order: orderId }).populate('menuItem')
    let total = 0

    for (const item of orderItems) {
        if (item.menuItem) {
        total += item.menuItem.price * item.quantity
        }
    }

    await Order.findByIdAndUpdate(orderId, { totalAmount: total })
}
