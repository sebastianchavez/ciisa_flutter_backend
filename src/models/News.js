const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new Schema({
  image: String,
  title: String,
  description: String,
  segmentations: [
    {
      segmentId: { type: Schema.Types.ObjectId, ref: 'Segment'}
    }
  ],
  comentaries: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User'},
      comentary: String,
      date: Date,
      visible: Boolean
    }
  ],
  likes: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User'}
    }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model('News', newsSchema)
