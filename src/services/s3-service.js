const AWS = require('aws-sdk')
const { s3AccessKeyId, s3SecretAccessKey, bucket, bucketkey, ACL } = require('../config/server')
const s3Sertive = {}

AWS.config.update({
  accessKeyId: s3AccessKeyId,
  secretAccessKey: s3SecretAccessKey
})

const params = {
  Bucket: bucket,
  Key: bucketkey,
  ACL: ACL
}

s3Sertive.getObject = async obj => {
  try {
    const s3 = new AWS.S3()
    params.Key = `${obj.path}${obj.image}`
    const response = await s3.listObjects(params)
    return response
  } catch (err) {
    return err
  }
}

s3Sertive.saveImage = (obj, callback) => {
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

s3Sertive.deleteImage = (obj, callback) => {
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

module.exports = s3Sertive
