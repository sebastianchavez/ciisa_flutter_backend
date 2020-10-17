const mongoose = require('mongoose')
const Schema = mongoose.Schema

const segmentSchema = new Schema({
    career: String,
    subject: String,
    section: Number,
    period: Number
}, {
  timestamps: true
})

module.exports = mongoose.model('Segment', segmentSchema)
