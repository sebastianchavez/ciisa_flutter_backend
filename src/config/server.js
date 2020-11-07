const CONSTANTS = require('./constants')

if (process.env.NODE_ENV === 'prod') {
  require('dotenv').config()
  console.log('Ambiente Produccion')
} else {
  console.log('Ambiente Desarrollo')
}

module.exports = {
  PORT: process.env.PORT || CONSTANTS.SERVER.PORT,
  DB: process.env.DB_HOST || CONSTANTS.SERVER.DB_HOST,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID || CONSTANTS.SERVICES.S3.ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY || CONSTANTS.SERVICES.S3.SECRET_ACCESS_KEY,
  S3_BUCKET: process.env.S3_BUCKET || CONSTANTS.SERVICES.S3.BUCKET,
  S3_BUCKET_KEY: process.env.S3_BUCKET_KEY || CONSTANTS.SERVICES.S3.BUCKET_KEY,
  ACL: process.env.ACL || CONSTANTS.SERVICES.S3.ACL,
  SECRET_TOKEN: process.env.SECRECT_TOKEN || CONSTANTS.SERVER.SECRECT_TOKEN,
  emailService: process.env.EMAIL_SERVICE || CONSTANTS.SERVICES.EMAIL.SERVICE,
  emailHost: process.env.EMAIL_HOST || CONSTANTS.SERVICES.EMAIL.HOST,
  emailPort: process.env.EMAIL_PORT || CONSTANTS.SERVICES.EMAIL.PORT,
  emailUser: process.env.EMAIL_USER || CONSTANTS.SERVICES.EMAIL.USER,
  emailPass: process.env.EMAIL_PASS || CONSTANTS.SERVICES.EMAIL.PASS,
  emailAdmin: process.env.EMAIL_ADMIN || CONSTANTS.SERVICES.EMAIL.ADMIN
}
