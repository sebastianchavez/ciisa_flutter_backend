const Segment = require('../models/Segment')
const CONSTANTS = require('../config/constants')
const segmentCtrl = {}

segmentCtrl.getAll = async (req, res) => {
    try {
        const segments = await Segment.find()
        res.json(segments)
    } catch (e) {
        res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
}

module.exports = segmentCtrl
