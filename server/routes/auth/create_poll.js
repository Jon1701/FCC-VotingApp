////////////////////////////////////////////////////////////////////////////////
// Module dependencies
////////////////////////////////////////////////////////////////////////////////
const mongoose = require('mongoose'); // MongoDB database driver.
const jwt = require('jsonwebtoken');  // JSON Web Tokens

////////////////////////////////////////////////////////////////////////////////
// Externals
////////////////////////////////////////////////////////////////////////////////
const hashedAuthentication = require('../../authentication/userLogin');  //Generates hashed credentials
const APP_CONFIG = require('../../config/appConfig');     // Application variables.
const RESPONSE = require('../../responseMessages/index'); // Error/Success responses.
const DB_CONFIG = require('../../config/dbConfig');       // Database information.
const REGEX = require('../../regex/index');               // Regular expressions.

////////////////////////////////////////////////////////////////////////////////
// Database
////////////////////////////////////////////////////////////////////////////////
mongoose.createConnection(DB_CONFIG['CONN_STRING']);  // Connect to the database.

// Database model for a Poll.
const Poll = require('../../models/Poll');

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
