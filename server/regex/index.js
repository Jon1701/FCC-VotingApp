const rules = {
  username: /^[\w\d]{8,25}$/,
  password: /^[\w\d]{8,50}$/,
  POLL: {
    TITLE_STRING: /^[\w\d\s]{8,1000}$/,
    CHOICE_STRING: /^[\w\d\s]{1,30}$/,
    OPTION_REQ_HEADER: /^option[\d]+$/
  }
}

module.exports = rules;
