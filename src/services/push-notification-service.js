const PushNotification = require('../models/PushNotification')
const mongoose = require('mongoose')
const { TYPES_NOTIFICATION, STATES_NOTIFICATION } = require('../config/constants')
const pushNotificationService = {}


pushNotificationService.sendPush = async (data, callback) => {
    try {
        let dataToSave = {}
        switch(data.type){
            case TYPES_NOTIFICATION.NEWS:
                dataToSave = {
                    userId: mongoose.Types.ObjectId(data.userId),
                    type: TYPES_NOTIFICATION.NEWS,
                    newsId: mongoose.Types.ObjectId(data.newsId),
                    states: [
                        {
                            state: STATES_NOTIFICATION.SEND,
                            date: new Date()
                        }
                    ]
                }
                break
            case TYPES_NOTIFICATION.ACTIVITY:
                dataToSave = {
                    userId: mongoose.Types.ObjectId(data.userId),
                    type: TYPES_NOTIFICATION.NEWS,
                    activityId: mongoose.Types.ObjectId(data.activityId),
                    states: [
                        {
                            state: STATES_NOTIFICATION.SEND,
                            date: new Date()
                        }
                    ]
                }
                break
            case TYPES_NOTIFICATION.NOTIFICATION:
                dataToSave = {
                    userId: mongoose.Types.ObjectId(data.userId),
                    type: TYPES_NOTIFICATION.NEWS,
                    notificationId: mongoose.Types.ObjectId(data.notificationId),
                    states: [
                        {
                            state: STATES_NOTIFICATION.SEND,
                            date: new Date()
                        }
                    ]
                }
                break
        }
        const newPush = new PushNotification(dataToSave)
        await newPush.save()
        callback(null, newPush)
    } catch (e) {
        callback(e)
    }
}

module.exports = pushNotificationService