import Note from './model'

export default {
  async create (data) {
    const note = new Note(data)
    return note.save()
  }
}
