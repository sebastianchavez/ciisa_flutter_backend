const { Router } = require('express')
const api = Router()
const { register, signIn } = require('../controllers/admin.controller')

api.post('/register', register)

api.put('/login', signIn)

module.exports = api