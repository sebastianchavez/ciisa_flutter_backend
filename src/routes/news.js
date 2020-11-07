const { Router } = require('express')
const api = Router()
const auth = require('../middlewares/auth')
const { createNews, deleteImage, getByCriteria, getById, updateImage, updateNews } = require('../controllers/news.controller')

// GET

api.get('/get-by-criteria', auth, getByCriteria)
api.get('/get-by-id/:id', auth, getById)


// POST

api.post('/crea-news', auth, createNews)


// PUT

api.put('/update-news', auth, updateNews)
api.put('/update-image', auth, updateImage)
api.put('/delete-image', auth, deleteImage)


module.exports = api
