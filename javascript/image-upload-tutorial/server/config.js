exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
  ? 'production-origin'
  : 'http://localhost:3000'