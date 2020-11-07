const mongoose = require('mongoose')
const config = require('../config/server')

const URI = config.DB

mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const connection = mongoose.connection

connection.once('open', () => {
  console.log('DB is connected')
})
