const response = (code, message) => {
  return {
    code: code,
    message: message
  }
}

const errorResponses = {
    LOGIN: {
      MISSING_CREDENTIALS: response('MISSING_CREDENTIALS'),
      INVALID_CREDENTIALS: response('INVALID_CREDENTIALS')
    },
    SIGNUP: {
      MISSING_CREDENTIALS: response('MISSING_CREDENTIALS'),
      INVALID_USERNAME: response('INVALID_USERNAME'),
      INVALID_PASSWORD:  response('INVALID_PASSWORD'),
      EXISTING_USER:  response('EXISTING_USER')
    },
    TOKEN: {
      MISSING_TOKEN: response('MISSING_TOKEN'),
      INVALID_TOKEN: response('INVALID_TOKEN'),
      EXPIRED_TOKEN: response('EXPIRED_TOKEN'),
    },
    POLL: {
      INVALID_TITLE: response('INVALID_TITLE'),
      NO_TITLE: response('NO_TITLE'),
    },
    DB: {
      DB_ERROR: response('DB_ERROR'),
    }
}

const successResponses = {
  SIGNUP: {
    USER_CREATED: response('USER_CREATED')
  },
  POLL: {
    POLL_CREATED: response('POLL_CREATED')
  }
}

module.exports = {
  ERROR: errorResponses,
  SUCCESS: successResponses
}
