const appConfig = {
  'JWT_SIGNING_KEY': process.env['APP_JWT_SIGNING_KEY'],
  'JWT_TOKEN_EXPIRATION_MINUTES': 1440
}

module.exports = appConfig;
