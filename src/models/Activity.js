const mongoose = require('mongoose')
const Schema = mongoose.Schema

const activitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref:'User' },
  title: String,
  description: String,
  date: Date,
  initialHour: Number,
  finishHout: Number
}, {
  timestamps: true
})

module.exports = mongoose.model('Activity', activitySchema)
