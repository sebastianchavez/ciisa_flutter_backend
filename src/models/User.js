const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  rut: { type: String, unique: true},
  password: String,
  name: String,
  email: String,
  lastname: String,
  lastLogin: Date,
  profileImage: String,
  type: String,
  active: Boolean,
  career: String,
  segments: [
    {
      segmentId: { type: Schema.Types.ObjectId, ref:'Segment' }
    }
  ],
  deviceToken: String
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
