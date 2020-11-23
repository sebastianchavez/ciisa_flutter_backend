const { Router } = require('express')
const api = Router()
const auth = require('../middlewares/auth')
const { testPush } = require('../controllers/notification.controller')

api.post('/test', testPush)

module.exports = api
