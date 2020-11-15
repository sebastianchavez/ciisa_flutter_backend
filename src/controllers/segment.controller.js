const Segment = require('../models/Segment')
const CONSTANTS = require('../config/constants')
const segmentCtrl = {}

segmentCtrl.newSegment = async (req, res) => {
  try {
    const { career, subject, section, period } = req.body
    const segment = await Segment.findOne({career, subject, section, year, period})
    if(!segment){
      const newSegment = new Segment({
        career: career.toLowerCase(),
        subject: subject.toLowerCase(),
        section,
        year,
        period
      })
      await newSegment.save()
      res.json({ message: 'Segmentacion agregada' })
    } else {
      res.status(400).json({ message: 'Ya existe esta segmentación' })
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

module.exports = segmentCtrl
