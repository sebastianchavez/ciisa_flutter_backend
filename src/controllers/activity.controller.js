const mongoose = require('mongoose')
const CONSTANTS = require('../config/constants')
const User = require('../models/User')
const Segment = require('../models/Segment')
const Activity = require('../models/Activity')

const activityCtrl = {}

activityCtrl.getActivities = async (req, res) => {

    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (e) {
        res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
    
};

activityCtrl.createActivities = async (req, res) => {
    //let users = []
    
    //console.log(req.body);
    
    console.log('BODY: ', req.body)
    try {
        const { title, description, date, initialHour, finishHour, year, carreer, subject, section, period} = req.body
        
        
        let query = { }
        
        if(year > 0){
            query.year = year
        }
        if(carreer != ""){
            query.carreer = carreer    
        }
        if(subject != ""){
            query.subject = subject    
        }
        if(section > 0){
            query.section = section    
        }
        if(period > 0){
            query.period = period    
        }
        console.log('CRITERIA:', query)
        const segments = await Segment.find(query)
        //Hasta aqui esta funcionando




        if(segments && segments.length > 0){
            const segmentations = []
            segments.forEach(s => {
                segmentations.push({segmentId: mongoose.Types.ObjectId(s._id)})
            })
            
            const arraySegments = segmentations.map(s => s.segmentId)
            const users = await User.find({'segments.segmentId': {$in: arraySegments}})
            console.log('Usuarios:', users)
            
            if(users.length > 0){
                for(let user in users) {
                    
                    user_info = users[user]
                    user_id = user_info._id
                    
                    let newActivity = new Activity({
                        userId: mongoose.Types.ObjectId(user._id),
                        title,
                        description,
                        date,
                        initialHour,
                        finishHour
                    })  

                    await newActivity.save();
                    
                }
            }
            
        }
        
        
        //const users = await User.find({ segments: [query]})
        //const users = await User.find({ query })
        //const users = await User.find()
        /*
        for(user in users) {

            user_info = users[user]
            user_id = user_info._id
            /*
            const newActivity = new Activity({
                userId: user_id,
                title,
                description,
                date,
                initialHour,
                finishHour
            })

            
            await newActivity.save();
            console.log(user_id)
        }*/
        
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