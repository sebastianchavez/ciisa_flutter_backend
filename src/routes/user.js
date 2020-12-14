const { Router } = require('express')
const auth = require('../middlewares/auth')
const api = Router()
const { register, signIn, getUsers, accessToken, registerByExcel, searchUser } = require('../controllers/user.controller')

// GET
api.get('/all-users', auth, getUsers)
api.get('/accessToken', auth, accessToken)
api.get('/search-user', auth, searchUser)

// POST
api.post('/register', auth, register)
api.post('/register-by-excel', auth, registerByExcel)

// PUT
api.put('/login', signIn)
// api.put('/update-user', )

module.exports = api
