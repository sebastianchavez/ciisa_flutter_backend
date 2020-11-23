const mongoose = require('mongoose')
const News = require('../models/News')
const Segment = require('../models/Segment')
const User = require('../models/User')
const PushNotification = require('../models/PushNotification')
const s3Service = require('../services/s3-service')
const fcmService = require('../services/fcm-service')
const CONSTANTS = require('../config/constants')
const newsCtrl = {}

newsCtrl.createNews = async (req, res) => {
  console.log('BODY: ', req.body)
  try {
    const { image, title, description, criteria, imageName } = req.body
    const newCriteria = {}
    if (criteria.year > 0) {
      newCriteria.year = criteria.year
    }
    if (criteria.section > 0) {
      newCriteria.section = criteria.section
    }
    if (criteria.period > 0) {
      newCriteria.period = criteria.period
    }
    if (criteria.career != '') {
      newCriteria.career = criteria.career
    }
    if (criteria.subject != '') {
      newCriteria.subject = criteria.subject
    }
    const segments = await Segment.find(newCriteria)
    if (segments && segments.length > 0) {
      const segmentations = []
      segments.forEach(s => {
        segmentations.push({ segmentId: mongoose.Types.ObjectId(s._id) })
      })
      const arraySegments = segmentations.map(s => s.segmentId)
      setTimeout(async () => {
        const newNews = new News({
          image,
          imageName,
          title,
          description,
          segmentations,
          comentaries: [],
          likes: []
        })
        await newNews.save()
        const users = await User.find({ 'segments.segmentId': { $in: arraySegments } })
        console.log('Usuarios:', users)
        if (users.length > 0) {
          for (const usr of users) {
            if (usr.firebaseToken) {
              const newPush = new PushNotification({
                userId: mongoose.Types.ObjectId(usr._id),
                type: CONSTANTS.TYPES_NOTIFICATION.NEWS,
                newsId: mongoose.Types.ObjectId(newNews._id),
                states: [
                  {
                    state: CONSTANTS.STATES_NOTIFICATION.SEND,
                    date: new Date()
                  }
                ]
              })
              await newPush.save()
              const obj = {
                firebaseToken: usr.firebaseToken,
                title: 'Nueva noticia',
                body: 'CIISA ha publicado una nueva noticia',
                data: {
                  type: CONSTANTS.TYPES_NOTIFICATION.NEWS,
                  news: newNews
                }
              }
              fcmService.sendPush(obj)
            }
          }
          return res.json({ message: 'Noticia creada' })
        } else {
          return res.json({ message: 'Noticia creada' })
        }
      }, 1000)
    } else {
      res.status(404).json({ message: 'No existe segmentación' })
    }
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

newsCtrl.updateNews = async (req, res) => {
  try {
    // TODO: Definir campos que se actualizarán y la forma
    // await News.findByIdAndUpdate(req.params.id, {})
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

newsCtrl.getById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
    if (news) {
      res.status(200).json({ news })
    } else {
      res.status(404).json({ message: 'No se econtro noticia' })
    }
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

newsCtrl.getByCriteria = async (req, res) => {
  try {
    // TODO: Definir filtros
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

newsCtrl.getFirst = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if(user.segments && user.segments.length > 0){
      let arr = user.segments.map(s => s.segmentId)
      const news = await News.find({'segmentations.segmentId': {$in: arr}}).sort({createdAt: -1})
      return res.status(200).json({data: news})
    } else {
      return res.status(404).json({message: 'Usuario no cuenta con segmentaciones'})
    }
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

newsCtrl.updateImage = (req, res) => {
  try {
    const { image, imageName } = req.body
    const obj = {
      image: image,
      path: 'news/',
      name: imageName
    }
    s3Service.saveImage(obj, (error, response) => {
      if (error) {
        console.log('Error s3:', error)
        return res.status(500).json({ message: 'Problemas con servicio de imagenes, favor intente más tarde' })
      } else {
        console.log('Response s3:', response)
        // TODO: crear formato de respuesta
        return res.status(200).json({ urlImage: response.Location })
      }
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

newsCtrl.deleteImage = async (req, res) => {
  try {
    const { imageName } = req.body
    const obj = {
      path: 'news/',
      name: imageName
    }
    s3Service.deleteImage(obj, (error, response) => {
      if (error) {
        return res.status(500).json({ message: 'Problemas con servicio de imagenes, favor intente más tarde' })
      } else {
        // TODO: crear formato de respuesta
        return res.status(200).json({})
      }
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

module.exports = newsCtrl
