import express from 'express'
import setup, { logStart } from './setup'

const app = express()
setup(app)

app.listen(process.env.PORT, () => logStart())
