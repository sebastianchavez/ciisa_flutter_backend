const fcmService = require('../services/fcm-service')
const notificationCtrl = {}

notificationCtrl.testPush = async (req, res) => {
  try {
    const { title, body, firebaseToken } = req.body
    const obj = {
      title,
      body,
      firebaseToken,
      data: {
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
        id: '1',
        status: 'done'
      }
    }
    fcmService.sendPush(obj)
    res.json({ message: 'Notificacion enviada' })
  } catch (e) {
    console.log(e)
    res.json({ message: 'Problemas al enviar notificacion' })
  }
}

module.exports = notificationCtrl
