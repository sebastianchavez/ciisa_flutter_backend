const { Router } = require('express')
const api = Router()
const auth = require('../middlewares/auth')
const { getAll, newSegment } = require('../controllers/segment.controller')

// GET
api.get('/get-all', auth, getAll)

// POST
api.post('/new-segment', auth, newSegment)

module.exports = api
