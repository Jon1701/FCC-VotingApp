const response = (code, message) => {
  return {
    type: 'SUCCESS',
    code: code,
    message: message
  }
}

const successCodes = {
  SIGNUP: {
    USER_CREATED: response('USER_CREATED', 'User successfully created.')
  },
  POLL: {
    CREATED: response('POLL_CREATED', 'Poll successfully created.')
  }

}

module.exports = successCodes;
