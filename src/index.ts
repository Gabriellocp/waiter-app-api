import express from 'express'
import mongoose from 'mongoose'
import http from 'node:http'
import path from 'node:path'
import { Server } from 'socket.io'
import { router } from './router'
const app = express()
const server = http.createServer(app)
export const io = new Server(server)
mongoose.connect('mongodb://localhost:27017')
  .then(() => {

    app.use((req, res, next) => {
      res.setHeader('access-control-allow-origin', '*')
      res.setHeader('access-control-allow-methods', '*')
      res.setHeader('access-control-allow-headers', '*')
      next()
    })
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    app.use(express.json())
    app.use(router)

    server.listen(3001, () => {
      console.log('Listening on http://localhost:3001',)
    })
  })
  .catch(() => console.log('Error connecting to db'))

