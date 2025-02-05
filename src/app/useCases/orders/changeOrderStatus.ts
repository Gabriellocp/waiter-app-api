import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params
    const { status } = req.body
    if (!["WAITING", "IN_PRODUCTION", "DONE"].includes(status.toUpperCase())) {
      res.status(400).send({
        error: "Invalid status"
      })
      return
    }
    await Order.findByIdAndUpdate(orderId, { status: status.toUpperCase() })
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({
      error: 'Failed to update order',
      err
    })
  }
}
