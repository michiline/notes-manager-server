import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import note from './routes/note'

export default (app) => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
  }
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  app.use(bodyParser.json())
  app.use(setResponseHeaders)
  const router = express.Router()
  app.use('/api/note', note)
  app.use(router)
}

export const setResponseHeaders = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  if (req.method === 'OPTIONS') {
    res.status(200).send('OK')
  } else {
    next()
  }
}
