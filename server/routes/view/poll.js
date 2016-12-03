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
const Poll = require('../../models/Poll.js'); // Poll
const Vote = require('../../models/Vote.js'); // Vote

const generateAggregatedResults = () => {

}

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

      // Tally up the votes in the poll.
      Vote.aggregate([
        {
          $match: {         //
            poll_id: pollId // Search for matching poll id.
          }                 //
        },
        {
          $group: {
            _id: '$choice', // Group by choice.
            count: {  //
              $sum: 1 // Count number of occurrences.
            }         //
          }
        }
      ], (err, result) => {

        // Error check.
        if (err) { return next(RESPONSE.ERROR.DB.DB_ERROR); }

        // Check if results were tallied.
        if (result.length > 0) {

          // Votes were made to this poll, tally up results.
          // Restructure the resulting document.
          const newResult = {};
          for (let i=0; i<result.length; i++) {
            let choice = result[i]['_id'];  // Poll choice
            let counts = result[i]['count'];// Choice count

            // Store in newResult.
            newResult[choice] = counts;
          }

          // Return results to user.
          return res.send(Object.assign({}, RESPONSE.SUCCESS.VIEW_POLL.VIEW_RESULTS, {results: newResult}));

        } else {

          // Restructure the resulting document.
          const newResult = {};
          for (let i=0; i<resultPoll.choices.length; i++) {

            // Poll choice.
            const choice = resultPoll.choices[i];

            // Store poll choice with count 0.
            newResult[choice] = 0;
          }

          // Return results to user.
          return res.send(Object.assign({}, RESPONSE.SUCCESS.VIEW_POLL.VIEW_RESULTS, {results: newResult}));

        }


      });

    });

  } else {

    // Invalid poll ID, return an error.
    return next(RESPONSE.ERROR.VIEW_POLL.INVALID_POLL_ID);

  }

}

// Export route definition.
module.exports = poll;
