import constants from '../../constants'

export default {
  create (err, req, res, next) {
    if (err.message === constants.error.invalidData) {
      req.message = constants.error.invalidData
      req.status = 400
    } else {
      generalError(req)
    }
    return sendResponse(req, res)
  }
}

function sendResponse (req, res) {
  return res.status(req.status).send({
    message: req.message
  })
}

function generalError (req) {
  req.message = constants.error.internalServerError
  req.status = 500
}
