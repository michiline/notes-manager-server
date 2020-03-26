import express from 'express'

import validate from './validate'
import controller from './controller'
import sendResponse from './sendResponse'
import catchErrors from './catchErrors'

const router = express.Router()

router.post('/',
  validate.create,
  controller.create
)

router.get('/',
  controller.get
)

router.use(catchErrors)
router.use(sendResponse)

export default router
