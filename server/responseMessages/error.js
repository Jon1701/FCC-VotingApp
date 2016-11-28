const createResponse = (message) => {
  return {
    type: 'error',
    message: message
  }
}

const errorCodes = {
  LOGIN: {
    NO_CREDENTIALS: createResponse('Both a username and password are required.'),
    NO_DB_CONNECTION: createResponse('Login failed. Server not responding.'),
    GENERAL: createResponse('Login failed.'),
    INVALID_CREDENTIALS: createResponse('Incorrect username or password.')
  },
  SIGNUP: {
    NO_CREDENTIALS: createResponse('Both a username and password are required.'),
    INVALID_USERNAME: createResponse('Invalid username. Alphanumeric characters only.'),
    INVALID_PASSWORD: createResponse('Invalid password. Alphanumeric characters only.'),
    NO_DB_CONNECTION: createResponse('Could not establish a connection to the server.'),
    USER_EXISTS: createResponse('A user with that username already exists.')
  }
}

module.exports = errorCodes;
