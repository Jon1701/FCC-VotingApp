const response = (code, message) => {
  return {
    type: 'ERROR',
    code: code,
    message: message
  }
}

const errorCodes = {
  LOGIN: {
    NO_CREDENTIALS: response('NO_CREDENTIALS', 'Both a username and password are required.'),
    NO_DB_CONNECTION: response('NO_DB_CONNECTION', 'Login failed. Server not responding.'),
    LOGIN_FAILED: response('LOGIN_FAILED', 'Login failed.'),
    INVALID_CREDENTIALS: response('INVALID_CREDENTIALS', 'Incorrect username or password.')
  },
  SIGNUP: {
    NO_CREDENTIALS: response('NO_CREDENTIALS', 'Both a username and password are required.'),
    INVALID_USERNAME: response('INVALID_USERNAME', 'Invalid username. Alphanumeric characters only.'),
    INVALID_PASSWORD: response('INVALID_PASSWORD', 'Invalid password. Alphanumeric characters only.'),
    NO_DB_CONNECTION: response('NO_DB_CONNECTION', 'Could not establish a connection to the server.'),
    USER_EXISTS: response('USER_EXISTS', 'A user with that username already exists.')
  },
  TOKEN: {
    NO_TOKEN: response('NO_TOKEN', 'No token provided. Token is required for access'),
    INVALID_TOKEN: response('INVALID_TOKEN', 'Token is invalid. Try and log in again.'),
    EXPIRED_TOKEN: response('EXPIRED_TOKEN', 'Token has expired. Try and log in again.'),
  },
  POLL: {
    INVALID_TITLE: response('INVALID_TITLE', 'Invalid title.'),
    NO_TITLE: response('NO_TITLE', 'Title is required')
  },
  DB: {
    DB_ERROR: response('DB_ERROR', 'Database error occurred.')
  }
}

module.exports = errorCodes;
