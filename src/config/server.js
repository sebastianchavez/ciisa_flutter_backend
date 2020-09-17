const CONSTANTS = require('./constants')

if (process.env.NODE_ENV === 'prod') {
  require('dotenv').config()
  console.log('Ambiente Produccion')
} else {
  console.log('Ambiente Desarrollo')
}

module.exports = {
  port: process.env.PORT || CONSTANTS.SERVER.PORT,
  db: process.env.DB_HOST || CONSTANTS.SERVER.DB_HOST,
  s3AccessKeyId: process.env.accessKeyId || CONSTANTS.SERVICES.S3.accessKeyId,
  s3SecretAccessKey: process.env.secretAccessKey || CONSTANTS.SERVICES.S3.secretAccessKey,
  bucket: process.env.bucket || CONSTANTS.SERVICES.S3.bucket,
  bucketkey: process.env.bucketkey || CONSTANTS.SERVICES.S3.bucketkey,
  ACL: process.env.ACL || CONSTANTS.SERVICES.S3.ACL,
  SECRET_TOKEN: CONSTANTS.SERVER.SECRECT_TOKEN,
  emailService: process.env.EMAIL_SERVICE || CONSTANTS.SERVICES.EMAIL.SERVICE,
  emailHost: process.env.EMAIL_HOST || CONSTANTS.SERVICES.EMAIL.HOST,
  emailPort: process.env.EMAIL_PORT || CONSTANTS.SERVICES.EMAIL.PORT,
  emailUser: process.env.EMAIL_USER || CONSTANTS.SERVICES.EMAIL.USER,
  emailPass: process.env.EMAIL_PASS || CONSTANTS.SERVICES.EMAIL.PASS,
  emailAdmin: process.env.EMAIL_ADMIN || CONSTANTS.SERVICES.EMAIL.ADMIN
}
