import constants from '../../constants'

export default {
  create (req, res, next) {
    try {
      if (!req.body || !req.body.title || !req.body.tags || !req.body.body) {
        throw new Error(constants.error.invalidData)
      }
      return next()
    } catch (err) {
      return next(err)
    }
  }
}
