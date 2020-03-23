import constants from '../../constants'

export default {
  create (req, res) {
    req.status = 200
    req.message = constants.success.noteCreated
    req.data = mapNote(req.note)
    return sendResponse(req, res)
  }
}

function sendResponse (req, res) {
  return res.status(req.status).send({
    message: req.message,
    data: req.data
  })
}

function mapNote (note) {
  return {
    tags: note.tags,
    title: note.title,
    body: note.body,
    dueDate: note.dueDate,
    created: note.created,
    updated: note.updated,
    done: note.done
  }
}
