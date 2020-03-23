import express from 'express'
import setup from './setup'

const app = express()
setup(app)

app.listen(process.env.PORT, () => console.log('Server running on port ' + process.env.PORT))
