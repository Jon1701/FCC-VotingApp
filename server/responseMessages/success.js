const response = (code, message) => {
  return {
    type: 'success',
    code: code,
    message: message
  }
}

const successCodes = {
  SIGNUP: {
    USER_CREATED: response('USER_CREATED', 'User successfully created.')
  }

}

module.exports = successCodes;
