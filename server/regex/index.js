const rules = {
  username: /^[\w]{8,25}$/,
  password: /^[\w]{8,50}$/,
  POLL: {
    TITLE_STRING: /^[\w\s]{8,50}$/,
    CHOICE_STRING: /^[\w\s]{1,30}$/,
    OPTION_REQ_HEADER: /^option[\d]+$/
  }
}

module.exports = rules;
