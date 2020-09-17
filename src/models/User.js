const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  name: String,
  lastname: String,
  genre: String,
  age: Number,
  nacionality: String,
  lastLogin: Date,
  avatar: String,
  type: String,
  active: Boolean,
  state: String,
  accessToken: String,
  deviceToken: String
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
