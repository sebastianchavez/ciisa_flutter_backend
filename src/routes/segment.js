const { Router } = require('express')
const api = Router()
const { getAll } = require('../controllers/segment.controller')

// GET
api.get('/', getAll)

module.exports = api