const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  rut: String,
  password: String,
  name: String,
  email: String,
  lastname: String,
  lastLogin: Date,
  profileImage: String,
  role: String,
  active: Boolean,
  segmentations: [
    { 
      segmentId: { type: Schema.Types.ObjectId, ref: 'Segment'} 
    }
  ],
  deviceToken: String
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
