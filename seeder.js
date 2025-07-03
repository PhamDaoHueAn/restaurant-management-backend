import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from './models/userModel.js'
import { Table } from './models/tableModel.js'
import { MenuCategory } from './models/menuCategoryModel.js'
import { MenuItem } from './models/menuItemModel.js'
import { Order } from './models/orderModel.js'
import { OrderItem } from './models/orderItemModel.js'
import { Payment } from './models/paymentModel.js'
import connectDB from './config/db.js'
import bcrypt from 'bcryptjs'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Table.deleteMany()
    await MenuCategory.deleteMany()
    await MenuItem.deleteMany()
    await Order.deleteMany()
    await OrderItem.deleteMany()
    await Payment.deleteMany()

    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', 10),
      role: 'admin'
    })

    const tables = await Table.insertMany([
      { tableNumber: 1 },
      { tableNumber: 2 },
      { tableNumber: 3 }
    ])

    const categories = await MenuCategory.insertMany([
      { name: 'Main Dishes' },
      { name: 'Drinks' },
      { name: 'Desserts' }
    ])

    const menuItems = await MenuItem.insertMany([
      {
        name: 'Grilled Chicken',
        price: 120000,
        category: categories[0]._id,
        description: 'Delicious grilled chicken with herbs'
      },
      {
        name: 'Beef Steak',
        price: 180000,
        category: categories[0]._id,
        description: 'Tender beef steak with sauce'
      },
      {
        name: 'Coca Cola',
        price: 20000,
        category: categories[1]._id,
        description: 'Chilled soft drink'
      },
      {
        name: 'Chocolate Cake',
        price: 50000,
        category: categories[2]._id,
        description: 'Sweet and moist cake'
      }
    ])

    const orderItem1 = await OrderItem.create({
      menuItem: menuItems[0]._id,
      quantity: 2
    })
    const orderItem2 = await OrderItem.create({
      menuItem: menuItems[2]._id,
      quantity: 1
    })

    const totalAmount = menuItems[0].price * 2 + menuItems[2].price * 1
    
    const order = await Order.create({
      table: tables[0]._id,
      orderItems: [orderItem1._id, orderItem2._id],
      status: 'served',
      totalAmount
    })

    

    await Payment.create({
      order: order._id,
      amount: totalAmount,
      method: 'cash'
    })

    console.log('Full Sample Data Imported Successfully!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  console.log('Delete only mode not implemented yet')
  process.exit()
} else {
  importData()
}
