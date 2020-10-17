const { Router } = require('express')
const api = Router()
const { register, signIn, getUsers } = require('../controllers/user.controller')

// GET
api.get('/all-users', getUsers)

// POST
api.post('/register', register)

// PUT
api.put('/login', signIn)
api.put('/update-user', )

module.exports = api
