import noteRepo from './repository'

export default {
  async create (req, res, next) {
    try {
      res.data = await noteRepo.create(req.body)
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  },
  async get (req, res, next) {
    try {
      res.data = await noteRepo.get(req.query)
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  }
}
