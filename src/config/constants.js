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
    DB_HOST: 'mongodb+srv://appipciisa:3pMZs0eKOoWmwMwG@flutterdev.k4c0k.mongodb.net/ciisa-dev?retryWrites=true&w=majority',
    // DB_HOST: 'mongodb://localhost/flutter-ciisa-dev',
    SECRECT_TOKEN: 'tokenipciisaproyectoflutter'
  },
  SERVICES: {
    S3: {
      URL: '',
      ACCESS_KEY_ID: '',
      SECRET_ACCESS_KEY: '',
      BUCKET: '',
      BUCKET_KEY: '',
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
  },
  PATHS: {

  }
}
