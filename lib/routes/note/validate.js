export default {
  create (req, res, next) {
    try {
      if (!req.body || !req.body.title || !req.body.tags || !req.body.body) {
        throw new Error('INVALID_DATA')
      }
      return next()
    } catch (err) {
      return next(err)
    }
  }
}
