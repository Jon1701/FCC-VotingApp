const rules = {
  username: /^[\w\d]{8,25}$/,
  password: /^[\w\d]{8,50}$/,
  POLL: {
    TITLE_STRING: /^.{8,1000}$/,
    CHOICE_STRING: /^.{1,50}$/
  }
}

module.exports = rules;
