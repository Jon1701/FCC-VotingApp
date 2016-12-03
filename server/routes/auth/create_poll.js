////////////////////////////////////////////////////////////////////////////////
// Module dependencies
////////////////////////////////////////////////////////////////////////////////
const mongoose = require('mongoose'); // MongoDB database driver.
const jwt = require('jsonwebtoken');  // JSON Web Tokens
const rfr = require('rfr');           // Root relative paths.

////////////////////////////////////////////////////////////////////////////////
// Externals
////////////////////////////////////////////////////////////////////////////////
const hashedAuthentication = rfr('/server/authentication/userLogin');  //Generates hashed credentials
const APP_CONFIG = rfr('/server/config/appConfig');     // Application variables.
const RESPONSE = rfr('/server/responseMessages/index'); // Error/Success responses.
const DB_CONFIG = rfr('/server/config/dbConfig');       // Database information.
const REGEX = rfr('/server/regex/index');               // Regular expressions.

////////////////////////////////////////////////////////////////////////////////
// Database
////////////////////////////////////////////////////////////////////////////////
mongoose.createConnection(DB_CONFIG['CONN_STRING']);  // Connect to the database.

// Database model for a Poll.
const Poll = rfr('/server/models/Poll');  // Database model for a Poll.

////////////////////////////////////////////////////////////////////////////////
// Route definition
////////////////////////////////////////////////////////////////////////////////
const create_poll = (req, res, next) => {

  // Title error check.
  const title = req.body.title;
  if (title) {

    // Return error if title is not valid.
    if (!REGEX.POLL.TITLE_STRING.test(title)) {
      return next(RESPONSE.ERROR.POLL.INVALID_TITLE);
    }

  } else {

    // No title provided, return error.
    return next(RESPONSE.ERROR.POLL.NO_TITLE);
  }

  // Go through the request body and get the number of poll choices.
  const choices = req.body.choices;
  if (choices instanceof Array) {

    // Check to see if at least 2 poll choices have been provided, to a maximum of 10.
    if (choices.length >= 2 && choices.length <= 10) {

      // Remove leading and trailing whitespace for each choice.
      let filteredChoices = choices.map((val) => { return val.trim(); });

      // Remove choices which are not between 1 and 50 characters in length.
      filteredChoices = filteredChoices.filter((val, idx, arr) => { return REGEX.POLL.CHOICE_STRING.test(val); });

      // Remove duplicates.
      filteredChoices = Array.from(new Set(filteredChoices));

      // Before creating the poll, do a final check to see if the number of filtered
      // choices is between 2 and 10. If not, return an error.
      if (!(choices.length >= 2 && choices.length <= 10)) {
        return next(RESPONSE.ERROR.POLL.INSUFFICIENT_POLL_ANSWERS);
      }

      // Create a new poll.
      const newPoll = Poll({
        username: req.decoded.username,
        title: title,
        choices: filteredChoices
      });

      // Save the poll in the database.
      newPoll.save((err, result) => {

        // Return error if error occurred.
        if (err) {
          return next(RESPONSE.ERROR.DB.DB_ERROR);
        }

        // Return response message on success, include the _id field in the response.
        return res.send(Object.assign({}, RESPONSE.SUCCESS.POLL.POLL_CREATED, {'poll_id': result._id}));

      });

    } else {

      // Not an array, or fewer than 2 choices provided. Return error.
      return next(RESPONSE.ERROR.POLL.INSUFFICIENT_POLL_ANSWERS);

    }

  } else {

    // No poll choices have been provided, or fewer that 2 have been provided.
    // Return an error.
    return next(RESPONSE.ERROR.POLL.INSUFFICIENT_POLL_ANSWERS);

  }

}

// Export route definition.
module.exports = create_poll;
