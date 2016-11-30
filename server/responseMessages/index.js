const response = (code, message) => {
  return {
    code: code,
    message: message
  }
}

const errorResponses = {
    LOGIN: {
      MISSING_CREDENTIALS: response('MISSING_CREDENTIALS', 'Both username and password are required.'),
      INVALID_CREDENTIALS: response('INVALID_CREDENTIALS', 'Incorrect username or password')
    },
    SIGNUP: {
      MISSING_CREDENTIALS: response('MISSING_CREDENTIALS', 'Bother username and password are required.'),
      INVALID_USERNAME: response('INVALID_USERNAME', 'Username can only contain letters and numbers (dashes and underscores are allowed), between 8 and 25 characters long.'),
      INVALID_PASSWORD:  response('INVALID_PASSWORD', 'Password can only contain letters and numbers (dashes and underscores are allowed), between 8 and 50 characters long.'),
      EXISTING_USER:  response('EXISTING_USER', 'A user with that username already exists.')
    },
    TOKEN: {
      MISSING_TOKEN: response('MISSING_TOKEN', 'A login token is required.'),
      INVALID_TOKEN: response('INVALID_TOKEN', 'Login token is invalid.'),
      EXPIRED_TOKEN: response('EXPIRED_TOKEN', 'Login token has expired.'),
    },
    POLL: {
      INVALID_TITLE: response('INVALID_TITLE', 'Poll name can only contain letters, numbers, spaces, and must be between 8 and 1000 characters long.'),
      NO_TITLE: response('NO_TITLE', 'Poll name is required.'),
    },
    DB: {
      DB_ERROR: response('DB_ERROR', 'Server error. Unable to connect to the database'),
    }
}

const successResponses = {
  SIGNUP: {
    USER_CREATED: response('USER_CREATED', 'User successfully created.')
  },
  POLL: {
    POLL_CREATED: response('POLL_CREATED', 'Poll successfully created.')
  }
}

module.exports = {
  ERROR: errorResponses,
  SUCCESS: successResponses
}
