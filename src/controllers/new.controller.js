const CONSTANTS = require('../config/constants')
const newCtrl = {}

const New = require('../models/News')

newCtrl.getNews = async (req, res) => {

    try {
        const news = await New.find();
        res.json(news);
    } catch (e) {
        res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
    
};
newCtrl.createNews = async (req, res) => {
    
    try {
        const newNew = new New(req.body);
        await newNew.save();
    
        res.send({message: "New Created"});
    } catch (e) {
        res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
};
newCtrl.getNew = async (req, res) => {

    try {
        const new_ = await New.findById(req.params.id);
        res.send(new_);
    } catch (e) {
        res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
    
};

newCtrl.editNew = async (req, res) => {

    try {
        await New.findByIdAndUpdate(req.params.id, req.body);
        res.json({status: 'New Updated'})
    } catch (e) {
        res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
    
}; 

newCtrl.deleteNew = async (req, res) => {

    try {
        await New.findByIdAndDelete(req.params.id)
        res.join({status: 'New Deleted'})
    } catch (e) {
        res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
    
}; 


module.exports = newCtrl