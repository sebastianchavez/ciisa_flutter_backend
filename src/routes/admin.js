const { Router } = require('express')
const api = Router()
const { register, signIn, getById } = require('../controllers/admin.controller')

api.post('/register', register)

api.put('/login', signIn)

api.get('/get-by-id', getById)

module.exports = api
