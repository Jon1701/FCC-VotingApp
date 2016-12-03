////////////////////////////////////////////////////////////////////////////////
// Module dependencies
////////////////////////////////////////////////////////////////////////////////
const mongoose = require('mongoose'); // MongoDB database driver.

////////////////////////////////////////////////////////////////////////////////
// Externals
////////////////////////////////////////////////////////////////////////////////
const DB_CONFIG = require('../../config/dbConfig');               // Database information
const RESPONSE = require('../../responseMessages/index');        // Error/Success responses.
const REGEX = require('../../regex/index');                         // Regular expressions.

////////////////////////////////////////////////////////////////////////////////
// Database
////////////////////////////////////////////////////////////////////////////////
mongoose.createConnection(DB_CONFIG['CONN_STRING']);  // Connect to the database.

// Models.
const Poll = require('../../models/Poll.js');

////////////////////////////////////////////////////////////////////////////////
// Route definition
////////////////////////////////////////////////////////////////////////////////
const poll = (req, res, next) => {

  // Get the poll ID from the request parameters.
  const pollId = req.params.poll_id;

  // Check to see if the poll_id URL parameter is a valid ObjectId.
  if (mongoose.Types.ObjectId.isValid(pollId)) {

    // Valid ObjectId for a Pol' was returned, search the polls collection for a
    // poll with that ObjectId.
    Poll.findOne({_id: pollId}, (err, resultPoll) => {

      // Error check.
      if (err) { return next(RESPONSE.ERROR.DB.DB_ERROR); }

      // If no poll was found, return an error.
      if (!resultPoll) { return next(RESPONSE.ERROR.VIEW_POLL.NO_POLL_FOUND); }

      // A poll has been found, tally up the votes.

    });

  } else {

    // Invalid poll ID, return an error.
    return next(RESPONSE.ERROR.VIEW_POLL.INVALID_POLL_ID);

  }

}

// Export route definition.
module.exports = poll;
