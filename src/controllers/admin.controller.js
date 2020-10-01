const Admin = require('../models/Admin')
const bcrypt = require('bcrypt-nodejs')
const uuidv1 = require('uuid').v1
const authService = require('../services/auth-service')
const CONSTANTS = require('../config/constants')
const adminCtrl = {}

adminCtrl.register = async (req, res) => {
    try {
        const { rut, password, type } = req.body
        const newAdmin = new Admin({
            rut,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            role: type,
            active: true
        })
        await newAdmin.save()
        res.status(200).json({ message: 'Usuario registrado con éxito' })
    } catch (e) {
        console.log(err)
        if (err.code === 11000) {
            res.status(500).send({ message: 'Error: Cuenta duplicada' })
        } else {
            res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
        }
    }
}

adminCtrl.signIn = async (req, res) => {
    try {
        console.log('BODY:', req.body)
        const { rut, password } = req.body
        const adminData = await Admin.findOne({ rut })
        if (adminData) {
            if (bcrypt.compareSync(password, adminData.password) === true) {
                if (adminData.active === true) {
                    const token = authService.createToken(adminData)
                    const body = adminData
                    body.accessToken = token
                    body.lastLogin = Date.now()
                    await Admin.findByIdAndUpdate(adminData._id, { lastLogin: body.lastLogin })
                    const { rut, role, _id } = adminData
                    return res.status(200).json({ rut, accessToken: token, email: adminData.email ? adminData.email : '', role, name: adminData.name ? adminData.name : '', _id })
                } else {
                    return res.status(101).send({ message: 'Usuario inactívo, favor consultar con el administrador' })
                }
            } else {
                res.status(400).send({ message: 'Contraseña incorrecta' })
            }
        } else {
            res.status(404).send({ message: 'No existe usuario' })
        }
    } catch (e) {
        console.log(e)
        res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
}

module.exports = adminCtrl