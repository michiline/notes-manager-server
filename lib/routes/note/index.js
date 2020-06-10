import express from 'express'

import validate from './validate'
import controller from './controller'
import sendResponse from './sendResponse'
import catchErrors from './catchErrors'

const router = express.Router()

router.get('/',
  controller.get
)

router.get('/pages',
  controller.getPages
)

router.post('/',
  validate.create,
  controller.create
)

router.patch('/:id',
  controller.update
)

router.delete('/:id',
  controller.delete
)

router.get('/tags',
  controller.tags
)

router.use(catchErrors)
router.use(sendResponse)

export default router
