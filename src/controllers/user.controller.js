const User = require('../models/User')
const bcrypt = require('bcrypt-nodejs')
const uuidv1 = require('uuid').v1
const emailService = require('../services/email-service')
const authService = require('../services/auth-service')
const CONSTANTS = require('../config/constants')
const userCtrl = {}

userCtrl.register = async (req, res) => {
  try {
    const { email, password, type } = req.body
    const newUser = new User({
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      role: type,
      active: true,
      state: 'available'
    })
    await newUser.save()
    res.status(200).json({ message: 'Usuario registrado con éxito' })
  } catch (err) {
    console.log(err)
    if (err.code === 11000) {
      res.status(500).send({ message: 'Error: Cuenta duplicada' })
    } else {
      res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
  }
}

userCtrl.signIn = async (req, res) => {
  try {
    const { type, email, password } = req.body
    const userData = await User.findOne({ email })
    if (userData) {
      if (bcrypt.compareSync(password, userData.password) === true) {
        if (type === 'admin') {
          if (userData.state === 'pending') {
            return res.status(404).send({ message: 'Cuenta pendiente a confirmación' })
          } else {
            const token = authService.createToken(userData)
            const body = userData
            body.accessToken = token
            body.lastLogin = Date.now()
            await User.findOneAndUpdate({ _id: userData._id }, { lastLogin: body.lastLogin })
            const { email, role, state, _id, following } = userData
            return res.status(200).json({ accessToken: token, email, name: userData.name ? userData.name : '', role, state, _id, avatar: userData.avatar ? userData.avatar : '', following })
          }
        } else if (type === 'user') {
          if (userData.state === 'available') {
            const token = authService.createToken(userData)
            const body = userData
            body.accessToken = token
            body.lastLogin = Date.now()
            await User.findByIdAndUpdate(userData._id, { lastLogin: body.lastLogin })
            const { email, role, state, _id, following } = userData
            return res.status(200).json({ accessToken: token, email, role, state, name: userData.name ? userData.name : '', avatar: userData.avatar ? userData.avatar : '', _id, following })
          } else {
            return res.status(101).send({ message: 'Usuario inactívo, favor consultar con el administrador' })
          }
        } else {
          res.status(400).send({ message: 'Error: typo de usuario inválido' })
        }
      } else {
        res.status(400).send({ message: 'Error: contraseña incorrecta' })
      }
    } else {
      res.status(400).send({ message: 'Error: usuario inválido' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

userCtrl.getUsers = async (req, res) => {
  try {
    const user = await User.find()
    res.status(200).json(user)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

userCtrl.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

userCtrl.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email.split(',').join('.')
    const user = await User.find({ email })
    res.status(200).json(user)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

userCtrl.disableUser = async (req, res) => {
  try {
    const user = req.body
    await User.findByIdAndUpdate(user._id, { state: 'inavailable', active: false })
    res.status(200).send({ message: 'usuario deshabilitado' })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

userCtrl.activateUser = async (req, res) => {
  try {
    const id = req.body.id
    console.log(id)
    await User.findByIdAndUpdate(id, { state: 'available', active: true })
    res.status(200).send({ message: 'Usuario activado' })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

userCtrl.changePassword = async (req, res) => {
  try {
    const { password } = req.body
    await User.findOneAndUpdate({ _id: req.params.id }, { password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) })
    res.status(200).send({ message: 'Contraseña actualizada' })
  } catch (err) {
    res.status(500).send({ message: `Error: ${err.message}` })
  }
}

userCtrl.recoveryPassword = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (user) {
      if (user.state === 'available' || user.state === 'recovery') {
        const newPass = uuidv1().substr(0, 6)
        await User.findOneAndUpdate({ email }, { state: 'recovery', password: bcrypt.hashSync(newPass, bcrypt.genSaltSync(10)) })
        emailService.recoveryPassword(user, newPass)
        return res.status(200).send({ message: `Se ha enviado un correo a: ${email} con nueva contraseña` })
      } else {
        return res.status(401).send({ message: 'usuario inactivo' })
      }
    } else {
      return res.status(404).send({ message: 'No existe usuario' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
  }
}

module.exports = userCtrl
