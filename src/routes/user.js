const { Router } = require('express')
const auth = require('../middlewares/auth')
const api = Router()
const { register, signIn, getUsers, accessToken } = require('../controllers/user.controller')

// GET
api.get('/all-users', getUsers)
api.get('/accessToken', auth, accessToken)

// POST
api.post('/register', register)

// PUT
api.put('/login', signIn)
// api.put('/update-user', )

module.exports = api
