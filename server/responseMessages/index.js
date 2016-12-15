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
      INVALID_TITLE: response('INVALID_TITLE', 'Poll title must be between 8 and 1000 characters long.'),
      INVALID_CHOICE: response('INVALID_CHOICE', 'Poll answers must be between 1 and 50 characters long.'),
      NO_TITLE: response('NO_TITLE', 'Poll title is required.'),
      INSUFFICIENT_POLL_ANSWERS: response('INSUFFICIENT_POLL_ANSWERS', 'At least two Poll answers must be provided, to a maximum of 10.'),
      NO_POLL_FOUND: response('NO_POLL_FOUND', 'No poll with given Poll ID could be found.')
    },
    DB: {
      DB_ERROR: response('DB_ERROR', 'Server error. Unable to connect to the database'),
    },
    CAST_VOTE: {
      MISSING_CHOICE: response('MISSING_CHOICE', 'An answer is needed to cast a vote.'),
      ONE_CHOICE_ONLY: response('ONE_CHOICE_ONLY', 'Only one answer is allowed.'),
      INVALID_CHOICE: response('INVALID_CHOICE', 'Answer is invalid as it is not on the poll.'),
      ALREADY_VOTED: response('ALREADY_VOTED', 'User has already voted for this poll.')
    },
    VIEW_POLL: {
      INVALID_POLL_ID: response('INVALID_POLL_ID', 'Invalid Poll ID'),
      NO_POLL_FOUND: response('NO_POLL_FOUND', 'No poll found.')
    },
    BATCH_GET_POLLS: {
      INVALID_PAGE_NUMBER: response('INVALID_PAGE_NUMBER', 'Page number must be a positive integer starting at 1.')
    }
}

const successResponses = {
  SIGNUP: {
    USER_CREATED: response('USER_CREATED', 'User successfully created.')
  },
  POLL: {
    POLL_CREATED: response('POLL_CREATED', 'Poll successfully created.')
  },
  CAST_VOTE: {
    VOTE_SUCCESSFUL: response('VOTE_SUCCESSFUL', 'User has voted for this poll.')
  },
  VIEW_POLL: {
    VIEW_RESULTS: response('VIEW_RESULTS', 'Results tallied.')
  },
  BATCH_GET_POLLS: {
    POLLS_RETRIEVED: response('POLLS_RETRIEVED', 'Polls retrieved.')
  }
}

module.exports = {
  ERROR: errorResponses,
  SUCCESS: successResponses
}
