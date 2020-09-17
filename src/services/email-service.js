const nodemailer = require('nodemailer')
const { emailService, emailHost, emailPort, emailUser, emailPass } = require('../config/server')
const templates = require('./email-templates/user')
const email = {}

// setting
const transporter = nodemailer.createTransport({
  service: emailService,
  host: emailHost,
  port: emailPort,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPass
  },
  tls: {
    rejectUnauthorized: false
  }
})

email.recoveryPassword = async (user, pass) => {
  try {
    await transporter.sendMail({
      from: 'noresponder@dev.com',
      to: user.email,
      subject: 'Nueva contraseña',
      html: templates.newPassword(user, pass)
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = email
