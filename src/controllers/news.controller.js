const News = require('../models/News')
const Segment = require('../models/Segment')
const s3Service = require('../services/s3-service')
const CONSTANTS = require('../config/constants')
const newsCtrl = {}

newsCtrl.createNews = async (req, res) => {
    try {
        const { image, title, description, criteria } = req.body
        const segments = await Segment.find(criteria)
        if(segments && segments.length > 0){
            const segmentations = []
            segments.forEach(s => {
                segmentations.push({_id: s._id})
            })
            setTimeout(() => {
                const newNews = new News({
                    image,
                    title,
                    description,
                    comentaries: [],
                    likes: []    
                })
                await newNews.save()
            },1000)
        } else {
            res.status(404).json({message: 'No existe segmentación'})
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
        if(news) {
            res.status(200).json({news})
        } else {
            res.status(404).json({message: 'No se econtro noticia'})
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

newsCtrl.updateImage = (req, res) => {
    try {
        const { image, imageName } = req.body
        let obj = {
            image: image,
            path: 'news/',
            name: imageName
          }
        s3Service.saveImage(obj, (error, response) => {
            if(error){
                console.log('Error s3:', error)
                return res.status(500).json({message: 'Problemas con servicio de imagenes, favor intente más tarde'})
            }   else {
                // TODO: crear formato de respuesta
                return res.status(200).json({})
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
        let obj = {
            path: 'news/',
            name: imageName
        }
        s3Service.deleteImage(obj, (error, response) => {
            if(error){
                return res.status(500).json({message: 'Problemas con servicio de imagenes, favor intente más tarde'})
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