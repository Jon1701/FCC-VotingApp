////////////////////////////////////////////////////////////////////////////////
// Module dependencies
////////////////////////////////////////////////////////////////////////////////
const mongoose = require('mongoose'); // MongoDB database driver.
const jwt = require('jsonwebtoken');  // JSON Web Tokens

////////////////////////////////////////////////////////////////////////////////
// Externals
////////////////////////////////////////////////////////////////////////////////
const hashedAuthentication = require('../../authentication/userLogin');  //Generates hashed credentials
const APP_CONFIG = require('../../config/appConfig');           // Application variables.
const ERROR_RESPONSE = require('../../responseMessages/error'); // Error codes.
const SUCCESS_RESPONSE = require('../../responseMessages/success'); // Success messages.
const DB_CONFIG = require('../../config/dbConfig');             // Database information.
const REGEX = require('../../regex/index');                     // Regular expressions.

////////////////////////////////////////////////////////////////////////////////
// Database
////////////////////////////////////////////////////////////////////////////////
mongoose.createConnection(DB_CONFIG['connString']);  // Connect to the database.

const Poll = require('../../models/Poll'); // Database model for a Poll.

////////////////////////////////////////////////////////////////////////////////
// Route definition
////////////////////////////////////////////////////////////////////////////////
const new_poll = (req, res, next) => {

  // Title error check.
  const title = req.body.title;
  if (title) {

    // Return error if title is not valid.
    if (!REGEX.POLL.TITLE_STRING.test(title)) {
      return next(ERROR_RESPONSE.POLL.INVALID_TITLE);
    }

  } else {

    // No title provided, return error.
    return next(ERROR_RESPONSE.POLL.NO_TITLE);
  }

  // Go through the request body, and keep track of keys which start with the
  // word 'option', and end with a number.
  let choices = Object.keys(req.body).filter((key, idx, arr) => {
    return REGEX.POLL.OPTION_REQ_HEADER.test(key);
  });

  // choices array contains strings 'option1', 'option2', etc. Fill the array
  // with actual values from req.body, and trim leading/trailing whitespace.
  choices = choices.map((key, idx, arr) => {
    return req.body[key].trim();
  });

  // Convert choices to a Set, and then back into an array to remove duplicates.
  choices = Array.from(new Set(choices));

  // Create a new poll.
  const newPoll = Poll({
    username: req.decoded.username,
    title: title,
    choices: choices
  });

  // Save the poll in the database.
  newPoll.save((err) => {

    // Return error if error occurred.
    if (err) {
      return next(ERROR_RESPONSE.DB.DB_ERROR);
    }

    // Return response message on success.
    return res.send(SUCCESS_RESPONSE.POLL.CREATED);

  });

}

// Export route definition.
module.exports = new_poll;
