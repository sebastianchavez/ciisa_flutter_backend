const CONSTANTS = require('../config/constants')
const activityCtrl = {}

const Activity = require('../models/Activity')

activityCtrl.getActivities = async (req, res) => {

    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (e) {
        res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
    
};
activityCtrl.createActivities = async (req, res) => {
    
    try {
        const newActivity = new Activity(req.body);
        await newActivity.save();
    
        res.send({message: "Activity Created"});
    } catch (e) {
        res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
};
activityCtrl.getActivity = async (req, res) => {

    try {
        const activity = await Activity.findById(req.params.id);
        res.send(activity);
    } catch (e) {
        res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
    
};

activityCtrl.editActivity = async (req, res) => {

    try {
        await Activity.findByIdAndUpdate(req.params.id, req.body);
        res.json({status: 'Activity Updated'})
    } catch (e) {
        res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
    
}; 

activityCtrl.deleteActivity = async (req, res) => {

    try {
        await Activity.findByIdAndDelete(req.params.id)
        res.join({status: 'Activity Deleted'})
    } catch (e) {
        res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
    
}; 


module.exports = activityCtrl