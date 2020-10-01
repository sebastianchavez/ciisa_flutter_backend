const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comentarySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref='User' },
  postId: { type: Schema.Types.ObjectId, ref='Post' },
  comentary: String,
  visible: Boolean
}, {
  timestamps: true
})

module.exports = mongoose.model('Comentary', comentarySchema)
