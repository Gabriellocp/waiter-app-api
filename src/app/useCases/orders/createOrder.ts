import { Request, Response } from "express";
import { io } from "../../..";
import { Order } from "../../models/Order";

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, products } = req.body
    if (!products || products.length === 0) {
      res.status(400).json({
        error: 'Order must have products'
      })
    }
    const order = await Order.create({
      table,
      products
    })
    const orderDetails = await order.populate('products.product')
    io.emit('orders@new', { order: orderDetails })
    res.json({ order })
  } catch {
    res.status(500).json({
      error: 'Failed to create order'
    })
  }
}
