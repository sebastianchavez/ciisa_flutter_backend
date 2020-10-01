const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comentarySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref='User' },
  newId: { type: Schema.Types.ObjectId, ref='New' },
  comentary: String,
  visible: Boolean
}, {
  timestamps: true
})

module.exports = mongoose.model('Comentary', comentarySchema)
