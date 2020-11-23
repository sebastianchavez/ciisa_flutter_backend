const Segment = require('../models/Segment')
const CONSTANTS = require('../config/constants')
const segmentCtrl = {}

segmentCtrl.newSegment = async (req, res) => {
  try {
    const { career, subject, section, year, period } = req.body
    const segment = await Segment.findOne({ career: career.toLowerCase(), subject: subject.toLowerCase(), section, year, period })
    console.log('SEGMENT:', segment)
    if (!segment) {
      const newSegment = new Segment({
        career: career.toLowerCase(),
        subject: subject.toLowerCase(),
        section,
        year,
        period
      })
      await newSegment.save()
      return res.json({ message: 'Segmentacion agregada' })
    } else {
      return res.status(400).json({ message: 'Ya existe esta segmentación' })
    }
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

segmentCtrl.getAll = async (req, res) => {
  try {
    const segments = await Segment.find()
    res.json(segments)
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

segmentCtrl.getByYear = async (req, res) => {
  try {
    const year = req.params.year
    const segments = await Segment.find({ year })
    res.json(segments)
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

segmentCtrl.getByCriteria = async (req, res) => {
  try {

  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

segmentCtrl.getYears = async (req, res) => {
  try {
    const years = await Segment.aggregate([{ $group: { _id: { year: '$year' } } }])
    res.json(years)
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

segmentCtrl.getPeriodsByYear = async (req, res) => {
  try {
    const periods = await Segment.aggregate([{ $group: { _id: { period: '$period', year: '$year' } } }, { $match: { '_id.year': parseFloat(req.params.year) } }])
    res.json(periods)
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

segmentCtrl.getSectionsByYear = async (req, res) => {
  try {
    let sections = []
    if (req.params.year && req.params.period) {
      sections = await Segment.aggregate([{ $group: { _id: { section: '$section', year: '$year', period: '$period' } } }, { $match: { '_id.year': parseFloat(req.params.year), '_id.period': parseFloat(req.params.period) } }])
    } else if (req.params.year) {
      sections = await Segment.aggregate([{ $group: { _id: { section: '$section', year: '$year' } } }, { $match: { '_id.year': parseFloat(req.params.year) } }])
    }
    res.json(sections)
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

segmentCtrl.getCareersByYear = async (req, res) => {
  try {
    const careers = await Segment.aggregate([{ $group: { _id: { career: '$career', year: '$year' } } }, { $match: { '_id.year': parseFloat(req.params.year) } }])
    res.json(careers)
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

segmentCtrl.getSubjectsByYear = async (req, res) => {
  try {
    const subjects = await Segment.aggregate([{ $group: { _id: { subject: '$subject', year: '$year' } } }, { $match: { '_id.year': parseFloat(req.params.year) } }])
    res.json(subjects)
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

segmentCtrl.getCareers = async (req, res) => {
  try {
    const { year, period, section } = req.query
    const careers = await Segment.aggregate([{ $group: { _id: { section: '$section', year: '$year', period: '$period', career: '$career' } } }, { $match: { '_id.year': parseFloat(year), '_id.period': parseFloat(period), '_id.section': parseFloat(section) } }])
    res.json(careers)
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

segmentCtrl.getSubjects = async (req, res) => {
  try {
    console.log('QUERY:', req.query)
    const { year, period, section, career } = req.query
    const subjects = await Segment.aggregate([{ $group: { _id: { section: '$section', year: '$year', period: '$period', career: '$career', subject: '$subject' } } }, { $match: { '_id.year': parseFloat(year), '_id.period': parseFloat(period), '_id.section': parseFloat(section), '_id.career': career } }])
    console.log('SUBJECTS:', subjects)
    res.json(subjects)
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

module.exports = segmentCtrl
