////////////////////////////////////////////////////////////////////////////////
// Dependencies
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

// Models.
const Poll = rfr('/server/models/Poll');  // Database model for a Poll.
const Vote = rfr('/server/models/Vote');  // Database model for a Vote.

////////////////////////////////////////////////////////////////////////////////
// Route definition
////////////////////////////////////////////////////////////////////////////////
const cast_vote = (req, res, next) => {

  // Get username.
  const username = req.decoded.username;

  // Get poll id.
  const pollId = req.body.poll_id;

  // Get the poll choice from the user.
  const userChoice = req.body.choice;

  // Get poll choice, and do some error checking to see if it was given,
  if (userChoice) {

    // Return an error if more than one choice was provided.
    if (typeof(userChoice) != 'string') { return next(RESPONSE.ERROR.CAST_VOTE.ONE_CHOICE_ONLY); }

  } else {

    // No choice was sent, return an error.
    return next(RESPONSE.ERROR.CAST_VOTE.MISSING_CHOICE);

  }

  // Using the given poll id, search for that poll.
  Poll.findOne({_id: pollId}, (err, result) => {

    // Return error if one occurred.
    if (err) { return next(RESPONSE.ERROR.DB.DB_ERROR); };

    // Check to see if a poll was returned.
    if (result) {

      // A poll was found, check to see if the user's choice is on the poll.
      if (result.choices.indexOf(userChoice) >= 0) {

        // The user's choice is valid.
        // Need to check if user has already voted for this poll.
        Vote.findOne({username: username, poll_id: pollId}, (err, result) => {

          // Return error if one occurred.
          if (err) { return next(RESPONSE.ERROR.DB.DB_ERROR); };

          // If the user has already voted on the poll, return an error.
          if (result) { return next(RESPONSE.ERROR.CAST_VOTE.ALREADY_VOTED); };

          // User has not voted, create a Vote document.
          const newVote = Vote({
            username: username,     // Username
            poll_id: pollId,        // Poll ID
            choice: userChoice,     // User choice
            //creationDate          // Vote creation date.
          });

          // Store the Vote in the database.
          newVote.save((err, result) => {

            // If an error occurred, return an error.
            if (err) { return next(RESPONSE.ERROR.DB.DB_ERROR); };

            // Vote metadata.
            let payload = {
              pollID: result['poll_id'],  // Poll ID
              voteID: result['_id'],      // Vote ID
              username: username,         // Username
              choice: result['choice'],   // Voted choice
              creationDate: result['creationDate']  // Vote creation date.
            }

            // Return response message on success, include the _id field in the response.
            return res.send(Object.assign({}, RESPONSE.SUCCESS.POLL.POLL_CREATED, {payload: payload}));

          });
        });

      } else {

        // The user's choice is not on the poll, thus invalid. Return an error.
        return next(RESPONSE.ERROR.CAST_VOTE.INVALID_CHOICE);

      }

    } else {

      // No poll was found, return error.
      return next(RESPONSE.ERROR.POLL.NO_POLL_FOUND);

    }

    //return res.json('endpoint /auth/cast_vote');
  });


}

// Export route definition.
module.exports = cast_vote;
