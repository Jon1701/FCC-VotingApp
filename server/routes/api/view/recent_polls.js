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

////////////////////////////////////////////////////////////////////////////////
// Database
////////////////////////////////////////////////////////////////////////////////
mongoose.createConnection(DB_CONFIG['CONN_STRING']);  // Connect to the database.

// Models.
const Poll = rfr('/server/models/Poll.js'); // Poll

////////////////////////////////////////////////////////////////////////////////
// Route definition
////////////////////////////////////////////////////////////////////////////////
const recentPolls = (req, res, next) => {

  // Get page number from the request parameters.
  let pageNum = req.params.page_num;

  // Error checking and validation.
  if (isNaN(parseInt(pageNum)) || parseInt(pageNum) <= 0) {

    // If page number is not a number, or is less than 1, return error.
    return next(RESPONSE.ERROR.BATCH_GET_POLLS.INVALID_PAGE_NUMBER);

  }

  // Force page number to be an integer.
  pageNum = parseInt(pageNum);

  // Set number of polls per page and set offset to paginate results.
  const numDocsPerPage = 10;
  const skipOffset = (pageNum - 1) * numDocsPerPage;

  // Find all polls, paginate, and sort in descending order.
  // Suppress version key.
  Poll.find({}, {'__v': 0})
    .skip(skipOffset)
    .limit(numDocsPerPage)
    .sort({'_id': -1})
    .exec((err, pollsArray) => {

      // Database error check.
      if (err) { return next(RESPONSE.ERROR.DB.DB_ERROR) };

      // Response back to user.
      // Success message, and list of polls in a payload.
      const responseToUser = Object.assign({}, RESPONSE.SUCCESS.BATCH_GET_POLLS.POLLS_RETRIEVED, {payload: {polls: pollsArray}});

      // Send response.
      return res.json(responseToUser);

    });

}

// Export route definition.
module.exports = recentPolls;
