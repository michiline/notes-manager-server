import express from 'express'

import validate from './validate'
import controller from './controller'
import success from './success'
import error from './error'

import log from '../../log'

const router = express.Router()

router.post('/',
  validate.create,
  controller.create,
  log.success,
  log.error,
  success.create,
  error.create
)

export default router
