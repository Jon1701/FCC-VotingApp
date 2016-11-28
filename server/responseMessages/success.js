const createResponse = (message) => {
  return {
    type: 'success',
    message: message
  }
}

const successCodes = {
  SIGNUP: {
    USER_CREATED: createResponse('User successfully created.')
  }

}

module.exports = successCodes;
