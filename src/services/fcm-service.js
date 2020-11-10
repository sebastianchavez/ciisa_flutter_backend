const fetch = require('node-fetch')
const { FIREBASE_URL, FIREBASE_KEY } = require('../config/server')
const firebaseService = {}

firebaseService.sendPush = obj => {
    const firebaseBody = {
        to: obj.firebaseToken,
        notificatio: {
            title: obj.title,
            body: obj.body
        }, 
        data: obj.data
    }
    fetch(`${FIREBASE_URL}`, {
        method: 'post',
        body: firebaseBody,
        header: { 'Authorization': `key=${FIREBASE_KEY}` }
    }).then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log('ERROR FIREBASE:', err))
}

module.exports = firebaseService
