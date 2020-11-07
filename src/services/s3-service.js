const AWS = require('aws-sdk')
const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET, S3_BUCKET_KEY, ACL } = require('../config/server')
const s3Service = {}

AWS.config.update({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY
})

const params = {
  Bucket: S3_BUCKET,
  Key: S3_BUCKET_KEY,
  ACL: ACL
}

s3Service.getObject = async obj => {
  try {
    const s3 = new AWS.S3()
    params.Key = `${obj.path}${obj.image}`
    const response = await s3.listObjects(params)
    return response
  } catch (err) {
    return err
  }
}

s3Service.saveImage = (obj, callback) => {
  try {
    const s3 = new AWS.S3()
    const encodedImage = obj.image
    const decodedImage = Buffer.from(encodedImage, 'base64')
    console.log(decodedImage)
    params.Body = decodedImage
    params.Key = `${obj.path}${obj.name}`
    s3.upload(params).promise().then(res => {
      callback(null, res)
    }).catch(err => {
      console.log('ERROR:', err)
      callback(err)
    })
  } catch (err) {
    callback(err)
  }
}

s3Service.deleteImage = (obj, callback) => {
  try {
    const s3 = new AWS.S3()
    params.Key = `${obj.path}${obj.name}`
    delete params.ACL
    s3.deleteObject(params).promise().then(res => {
      callback(null, res)
    }).catch(err => {
      callback(err)
    })
  } catch (err) {
    callback(err)
  }
}

module.exports = s3Service
