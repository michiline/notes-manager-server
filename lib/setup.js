import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { v4 as uuidv4 } from 'uuid'
import note from './routes/note'
import { millisToString, logRequest } from './utils'

export default (app) => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
  }
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  app.use(bodyParser.json())
  app.use(setResponseHeaders)
  app.use(tagRequest)
  app.use(logRequest)
  const router = express.Router()
  app.use('/api/note', note)
  app.use(router)
  app.use(catchErrors)
}

export const setResponseHeaders = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PATCH')
  if (req.method === 'OPTIONS') {
    res.status(200).send('OK')
  } else {
    next()
  }
}

export const catchErrors = (err, req, res, next) => {
  if (err.type && err.type === 'entity.parse.failed') {
    return res.status(400).send({
      message: 'INVALID_JSON_DATA'
    })
  } else {
    console.log(err)
    return res.status(500).send({
      message: 'INTERNAL_SERVER_ERROR'
    })
  }
}

export const tagRequest = (req, res, next) => {
  req.tag = uuidv4()
  return next()
}

export const logStart = () => {
  console.log(`${millisToString()} - Notes Manager API started on port ${process.env.PORT}`)
}
