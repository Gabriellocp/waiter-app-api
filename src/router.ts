import { Router } from "express";
import multer from 'multer';
import path from 'node:path';
import { createCategory } from "./app/useCases/categories/createCategory";
import { listCategories } from "./app/useCases/categories/listCategories";
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCaterory";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { createOrder } from "./app/useCases/orders/createOrder";
import { deleteOrder } from "./app/useCases/orders/deleteOrder";
import { listOrders } from "./app/useCases/orders/listOrders";
import { createProduct } from "./app/useCases/products/createProducts";
import { listProducts } from "./app/useCases/products/listProducts";
export const router = Router()

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  }),
})
// List categories

router.get('/categories', listCategories)

// Create category

router.post('/categories', createCategory)

// List products

router.get('/products', listProducts)

// Create product

router.post('/products', upload.single('image'), createProduct)

// Get products by category

router.get('/categories/:categoryId/products', listProductsByCategory)

// List orders

router.get('/orders', listOrders)

// Create order

router.post('/orders', createOrder)

// Change order status

router.patch('/orders/:orderId', changeOrderStatus)


// Delete order

router.delete('/orders/:orderId', deleteOrder)
