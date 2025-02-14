import express from 'express'
import mongoose from 'mongoose'
import path from 'node:path'
import { router } from './router'
mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const app = express()
    app.use((req, res, next) => {
      res.setHeader('access-control-allow-origin', '*')
      res.setHeader('access-control-allow-methods', '*')
      res.setHeader('access-control-allow-headers', '*')
      next()
    })
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    app.use(express.json())
    app.use(router)
    app.listen(3001, () => {
      console.log('Listening on http://localhost:3001',)
    })
  })
  .catch(() => console.log('Error connecting to db'))

