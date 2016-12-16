// Root relative paths.
const rfr = require('rfr');

////////////////////////////////////////////////////////////////////////////////
// Module dependencies
////////////////////////////////////////////////////////////////////////////////
const mongoose = require('mongoose'); // MongoDB database driver.

////////////////////////////////////////////////////////////////////////////////
// Externals
////////////////////////////////////////////////////////////////////////////////
const DB_CONFIG = rfr('/server/config/dbConfig');       // Database information
const RESPONSE = rfr('/server/responseMessages/index'); // Error/Success responses.
const REGEX = rfr('/server/regex/index');               // Regular expressions.

////////////////////////////////////////////////////////////////////////////////
// Database
////////////////////////////////////////////////////////////////////////////////
mongoose.createConnection(DB_CONFIG['CONN_STRING']);  // Connect to the database.

// Models.
const Poll = rfr('/server/models/Poll.js'); // Poll
const Vote = rfr('/server/models/Vote.js'); // Vote

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

      // Get poll title and user.
      const pollTitle = resultPoll.title;
      const pollCreator = resultPoll.username;

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
      ], (err, aggResult) => {

        // Error check.
        if (err) { return next(RESPONSE.ERROR.DB.DB_ERROR); }

        // Check if results were tallied.
        if (aggResult.length > 0) {

          // Get an array of all poll choices in the aggregated result.
          const tallyPollChoices = aggResult.map((doc, idx, arr) => {
            return doc['_id'];
          });

          // Get an array of all poll choices in the poll.
          const allPollChoices = resultPoll['choices'];

          // Corrected tally, including choices with 0 votes.
          let tally = {};

          // Total number of votes.
          let numVotes = 0;

          // Go through all poll choices.
          for (let i=0; i<allPollChoices.length; i++) {

            // Current poll choice from all poll choices.
            let currentPollChoice = allPollChoices[i];

            // Check if the poll choice is in the tally poll choices array.
            if (tallyPollChoices.indexOf(currentPollChoice) == -1) {

              // Current poll choice was not tallied, store it with a count of 0.
              tally[currentPollChoice] = 0;

            } else {

              // If current poll choice is in the tally poll choices array.
              // Look up the count in the aggregated result and store it.
              for (let y=0; y<aggResult.length; y++) {

                if (aggResult[y]['_id'] == currentPollChoice) {
                  tally[currentPollChoice] = aggResult[y]['count'];

                  // Increment total number of votes.
                  numVotes += aggResult[y]['count'];
                }

              }

            }// end if

          }// end loop

          // Get poll metadata.
          const payload = {
            pollID: resultPoll['_id'],  // Poll ID
            title: pollTitle,           // Poll Title
            choices: resultPoll['choices'], // Poll choices.
            author: pollCreator,        // Poll creator.
            tally: tally,              // Tally of votes.
            numChoices: resultPoll['choices'].length, // Number of poll choices.
            numVotes: numVotes          // Total number of votes cast.
          }

          // Return results to user.
          return res.send(Object.assign({}, RESPONSE.SUCCESS.VIEW_POLL.VIEW_RESULTS, {payload: payload}));

        } else { // Poll has 0 votes.

          // Tally the results.
          // Since poll has 0 votes, just get the choices, and set counts to 0.
          let tally = {};
          for (let i=0; i<resultPoll['choices'].length; i++) {
            tally[resultPoll['choices'][i]] = 0;
          }

          // Get poll metadata.
          const payload = {
            pollID: resultPoll['_id'],  // Poll ID
            title: pollTitle,           // Poll Title
            choices: resultPoll['choices'], // Poll choices.
            author: pollCreator,        // Poll creator.
            tally: tally,              // Tally of votes.
            numChoices: resultPoll['choices'].length, // Number of poll choices.
            numVotes: 0                 // Total number of votes cast.
          }

          // Return results to user.
          return res.send(Object.assign({}, RESPONSE.SUCCESS.VIEW_POLL.VIEW_RESULTS, {payload: payload}));

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
