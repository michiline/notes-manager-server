import noteRepo from './repository'
import { pageSize } from '../../utils'

export default {
  async get (req, res, next) {
    try {
      const notes = await noteRepo.get(req.query)
      const pagesArr = await noteRepo.getPages(req.query)
      res.data = {
        notes,
        pages: pagesArr[0] ? Math.ceil(pagesArr[0].count / pageSize) : 0
      }
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  },
  async getPages (req, res, next) {
    try {
      const pageSize = 2
      const countArr = await noteRepo.getPages(req.query)
      res.data = {
        pages: Math.ceil(countArr[0].count / pageSize)
      }
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  },
  async create (req, res, next) {
    try {
      res.data = await noteRepo.create(req.body)
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  },
  async delete (req, res, next) {
    try {
      res.data = await noteRepo.delete(req.params.id)
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  },
  async update (req, res, next) {
    try {
      res.data = await noteRepo.update(req.params.id, req.body)
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  },
  async tags (req, res, next) {
    try {
      res.data = await noteRepo.tags()
      return next()
    } catch (err) {
      console.log(err)
      return next(err)
    }
  }
}
