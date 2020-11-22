const { Router } = require('express')
const api = Router()
const auth = require('../middlewares/auth')
const { getAll, newSegment, getByCriteria, getByYear, getYears, getPeriodsByYear, getSectionsByYear, getCareers, getSubjects } = require('../controllers/segment.controller')

// GET
api.get('/get-all', auth, getAll)
api.get('/get-by-criteria', auth, getByCriteria)
api.get('/year/:year', auth, getByYear)
api.get('/get-years', auth, getYears)
api.get('/periods/:year', auth, getPeriodsByYear)
api.get('/sections/year/:year/period/:period', auth, getSectionsByYear)
api.get('/careers', auth, getCareers)
api.get('/subjects', auth, getSubjects)


// POST
api.post('/new-segment', auth, newSegment)

module.exports = api
