const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const { port } = require('./config/server')

// settings
app.set('port', port)

// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json({ limit: '50mb' }))

// routes
app.use('/api/users', require('./routes/user'))
app.use('/api/admins', require('./routes/admin'))
app.use('/api/segments', require('./routes/segment'))
app.use('/api/news', require('./routes/news'))

module.exports = app
