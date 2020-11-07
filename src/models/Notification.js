const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  states: [
    {
      state: String,
      date: Date
    }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model('Notification', notificationSchema)
