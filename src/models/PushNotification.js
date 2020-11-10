const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pushNotificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  type: string,
  newsId: { type: Schema.Types.ObjectId, ref: 'News' },
  activityId: { type: Schema.Types.ObjectId, ref:'Activity' },
  notificationId: { type: Schema.Types.ObjectId, ref:'Notification' },
  states: [
    {
      state: String,
      date: Date
    }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model('PushNotification', pushNotificationSchema)
