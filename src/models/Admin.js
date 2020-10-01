const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
  rut: String,
  password: String,
  name: String,
  email: String,
  lastname: String,
  lastLogin: Date,
  role: String,
  active: Boolean
}, {
  timestamps: true
})

module.exports = mongoose.model('Admin', adminSchema)
