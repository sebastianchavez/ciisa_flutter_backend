const CONSTANTS = require('../config/constants')
const activityCtrl = {}
const User = require('../models/User')

const Activity = require('../models/Activity')

activityCtrl.getActivities = async (req, res) => {

    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (e) {
        res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
    
};
//  AQUI ES DONDE TENEMOS UN PROBLEMA AL MOMENTO DE CREARLOS PERO POR ALGUNA RAZON NO AL MOMENTO DE UPDATE


activityCtrl.createActivities = async (req, res) => {
    let users = []
    const {  title, description, date, initialHour, finishHour} = req.body;
    //const { title, description, date, initialHour, finishHour, _carreer, _subject, _section, _period} = req.body
    //const { title, description, date, initialHour, finishHour} = req.body;
    try {

        
        //const users = await User.find({ segments })
        
        /*
        var query = {carreer: _carreer, subject: _subject, section: _section, period: _period};
        */


        //Solo falta filtrar por segmentacion para estar perfecto
        //me falta poder tener usuarios con segmentacion para arreglarlo
       //const users = await User.find({ segments })
       const users = await User.find()
       
       for(user in users) {

            user_info = users[user]
            user_id = user_info._id
            
            const newActivity = new Activity({
                userId: user_id,
                title,
                description,
                date,
                initialHour,
                finishHour
            })

        
            await newActivity.save();
        }

        res.send({message: "Activity Created in Users"});
        //res.json({ users });
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
        //await Activity.findByIdAndUpdate(req.params.title, req.body);
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