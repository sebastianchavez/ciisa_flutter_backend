const { Router } = require('express')
const router = Router()
const { register, signIn } = require('../controllers/user.controller')

router.post('/register', register)

router.put('/login', signIn)

module.exports = router
