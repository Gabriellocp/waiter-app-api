import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function createproduct(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename
    const {
      category,
      description,
      ingredients,
      name,
      price
    } = req.body

    const product = await Product.create({
      name,
      category,
      description,
      imagePath,
      price: Number(price),
      ingredients: JSON.parse(ingredients),
    })

    res.status(201).json({ product })
  } catch {
    res.status(500).json({
      error: 'Failed to create product'
    })
  }
}
