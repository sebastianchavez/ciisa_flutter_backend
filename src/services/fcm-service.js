const fetch = require('node-fetch')
const { FIREBASE_URL, FIREBASE_KEY } = require('../config/server')
const firebaseService = {}

firebaseService.sendPush = obj => {
    const firebaseBody = {
        "to": obj.firebaseToken,
        "priority": "high",
        "notification": {
            "title": obj.title,
            "body": obj.body
        }, 
        "data": obj.data
    }

    let key= `key=${FIREBASE_KEY.toString()}`
    fetch(`${FIREBASE_URL}`, {
        method: 'POST',
        body: JSON.stringify(firebaseBody),
        headers: { 'Authorization': key , 'Content-Type': 'application/json' }
    }).then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log('ERROR FIREBASE:', err))
}

module.exports = firebaseService
