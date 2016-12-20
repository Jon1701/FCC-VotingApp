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

////////////////////////////////////////////////////////////////////////////////
// Helper functions.
////////////////////////////////////////////////////////////////////////////////

// Builds a Mongoose query to search by username.
const getQuery = (username) => {
  if (username) {
    return {username: username.trim()}
  } else {
    return {}
  }
}

// Builds the sort parameter for mongoose.
const getSort = (order) => {
  if (order == 'ascending') {
    return {'creationDate': 1};
  } else {
    return {'creationDate': -1};
  }
}

// Function to clean the page number and per page.
const cleanNumeric = (pageNum) => {

  // Check if not a number.
  if (isNaN(parseInt(pageNum))) {

    // If not a number, return 1
    return 1;

  } else {

    // Convert page number into an integer.
    pageNum = parseInt(pageNum);

    // If less than 1, return 1,
    // otherwise return the page number as an integer.
    if (pageNum < 1) {
      return 1;
    } else {
      return pageNum;
    }

  }

}

// Calculate the skip offset from the current page number, and the maximum
// number of results per page
const calcSkipOffset = (pageNum, perPage) => {

  // No more than 10 results per page.
  if (perPage >= 10) {
    perPage = 10
  }

  return (pageNum - 1) * perPage;

}

////////////////////////////////////////////////////////////////////////////////
// Route definition
////////////////////////////////////////////////////////////////////////////////
const batchGetPoll = (req, res, next) => {

  // Extract username and sorting order from query parameters.
  const username = req.query.username || null;      // Get username
  const pageNum = cleanNumeric(req.query.pageNum);  // Clean page number
  const perPage = cleanNumeric(req.query.perPage);  // Clean per page number
  const order = req.query.sort; // Sort order.

  // First get the number of polls found.
  Poll.count(getQuery(username))
    .exec((err, count) => {

      // Error check.
      if (err) { return next(RESPONSE.ERROR.DB.DB_ERROR); }

      // Get the number of documents found.
      let numResultsTotal = count;

      // Do a paginated query.
      Poll.find(getQuery(username), null)
        .sort(getSort(order))
        .skip(calcSkipOffset(pageNum, perPage))
        .limit(perPage)
        .exec((err, resultDocuments) => {

          // Error check.
          if (err) { return next(RESPONSE.ERROR.DB.DB_ERROR); }

          // Get search results and other metadata.
          const payload = {
            pageNum: pageNum,
            numResultsPerPage: perPage,
            numResultsTotal: numResultsTotal, // Total number of results,
            numResultsThisPage: resultDocuments.length,  // Number of results on this page.
            results: resultDocuments  // Array of documents.
          }

          // Return results to user.
          return res.send(Object.assign({}, RESPONSE.SUCCESS.BATCH_GET_POLLS.POLLS_RETRIEVED, {payload: payload}));

        });

    })

}

// Export route definition.
module.exports = batchGetPoll;
