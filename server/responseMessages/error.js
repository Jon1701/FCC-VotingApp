const response = (code, message) => {
  return {
    type: 'error',
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
  }
}

module.exports = errorCodes;
