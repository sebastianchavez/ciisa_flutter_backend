const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new Schema({
}, {
  timestamps: true
})

module.exports = mongoose.model('News', newsSchema)
