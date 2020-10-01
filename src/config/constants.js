// TODO: Ajustar variables a proyecto

module.exports = {
  MESSAGES: {
    ERROR: {
      DEFAULT_MESSAGE: 'En estos momentos existen dificultades, intente mas tarde',
      QUERY_ERROR: 'Error al ejecutar consulta'
    },
    SUCCESS: {
      DEFAULT_MESSAGE: 'Operacion exitosa'
    }
  },
  SERVER: {
    PORT: 3006,
    DB_HOST: 'mongodb://localhost/flutter-ciisa-dev',
    SECRECT_TOKEN: 'tokenipciisaproyectoflutter'
  },
  SERVICES: {
    S3: {
      accessKeyId: '',
      secretAccessKey: '',
      bucket: '',
      bucketkey: '',
      ACL: ''
    },
    EMAIL: {
      SERVICE: 'webmail',
      HOST: '',
      PORT: 465,
      USER: '',
      PASS: ''
    }
  },
  ROLES: {
    ADMIN: 'ADMIN',
    ADMINISTRATIVE: 'ADMINISTRATIVE',
    TEACHER: 'TEACHER',
    STUDENT: 'STUDENT'
  }
}
