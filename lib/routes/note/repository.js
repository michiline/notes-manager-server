import Note from './model'
import { pageSize } from '../../utils'

export default {
  async create (data) {
    const note = new Note(data)
    return note.save()
  },
  async get (query) {
    let queries = []
    if (query.words) {
      const words = query.words.replace('/,/g', ' ')
      queries.push({ $match: { $text: { $search: words } } })
      // queries.push({
      //   $match: {
      //     $or: [
      //       { title: {
      //         $regex: words,
      //         $options: 'i'
      //       } },
      //       { body: {
      //         $regex: words,
      //         $options: 'i'
      //       } }
      //     ]
      //   }
      // })
    }
    if (query.due) {
      const split = query.due.split(',')
      const from = parseInt(split[0])
      const to = parseInt(split[1])
      if (from === to && to === 0) {
        queries.push({
          $match: {
            due: 0
          }
        })
      } else {
        queries.push({
          $match: {
            $and: [
              { due: { $gte: from } },
              { due: { $lte: to } }
            ]
          }
        })
      }
    }
    if (query.tags) {
      queries.push({ $match: { tags: { $all: query.tags.split(',') } } })
    }
    if (query.done) {
      if (query.done === 'true') {
        queries.push({ $match: { done: { $in: [true, false] } } })
      } else {
        queries.push({ $match: { done: false } })
      }
    }
    queries.push({ $project: { _id: 0, id: '$_id', title: 1, tags: 1, body: 1, due: 1, created: 1, updated: 1, done: 1 } })
    if (query.due) {
      const split = query.due.split(',')
      const to = parseInt(split[1])
      if (to === 0) {
        queries.push({ $sort: { created: -1 } })
      } else {
        queries.push({ $sort: { due: 1 } })
      }
    }
    let page = 0
    if (query.page) {
      page = Number.parseInt(query.page)
      queries.push({ $skip: page * pageSize })
    }
    queries.push({ $limit: pageSize })
    return Note.aggregate(queries)
  },
  async getPages (query) {
    let queries = []
    if (query.words) {
      const words = query.words.replace('/,/g', ' ')
      queries.push({ $match: { $text: { $search: words } } })
    }
    if (query.due) {
      const split = query.due.split(',')
      const from = parseInt(split[0])
      const to = parseInt(split[1])
      if (from === to && to === 0) {
        queries.push({
          $match: {
            due: 0
          }
        })
      } else {
        queries.push({
          $match: {
            $and: [
              { due: { $gte: from } },
              { due: { $lte: to } }
            ]
          }
        })
      }
    }
    if (query.tags) {
      queries.push({ $match: { tags: { $all: query.tags.split(',') } } })
    }
    if (query.done) {
      if (query.done === 'true') {
        queries.push({ $match: { done: { $in: [true, false] } } })
      } else {
        queries.push({ $match: { done: false } })
      }
    }
    queries.push({ $project: { _id: 0, id: '$_id', title: 1, tags: 1, body: 1, due: 1, created: 1, updated: 1, done: 1 } })
    queries.push({ $count: 'count' })
    return Note.aggregate(queries)
  },
  async tags () {
    const queries = [
      {
        $unwind: '$tags'
      },
      {
        $group: {
          _id: '$tags',
          count: {
            $sum: 1
          }
        }
      },
      {
        $project: {
          _id: 0,
          tag: '$_id',
          count: 1
        }
      },
      {
        $sort: {
          count: -1
        }
      }
    ]
    return Note.aggregate(queries)
    // const result = await Note.distinct('tags')
    // return result.sort()
  },
  async delete (id) {
    const filter = {
      _id: id
    }
    const options = {}
    return Note.deleteOne(filter, options)
  },
  async update (id, data) {
    data.updated = Date.now()
    return Note.findByIdAndUpdate(id, data, { new: true })
  }
}
