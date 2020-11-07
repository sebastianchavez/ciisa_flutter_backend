const Segment = require('../models/Segment')
const CONSTANTS = require('../config/constants')
const segmentCtrl = {}

segmentCtrl.newSegment = async (req, res) => {
  try {
    const { career, subject, section, period } = req.body
    const newSegment = new Segment({
      career: career.toLowerCase(),
      subject: subject.toLowerCase(),
      section,
      period
    })
    await newSegment.save()
    res.json({ message: 'Segmentacion agregada' })
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
