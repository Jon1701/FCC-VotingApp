////////////////////////////////////////////////////////////////////////////////
// Module dependencies
////////////////////////////////////////////////////////////////////////////////
const mongoose = require('mongoose'); // MongoDB database driver.
const rfr = require('rfr');           // Root relative paths.

////////////////////////////////////////////////////////////////////////////////
// Externals
////////////////////////////////////////////////////////////////////////////////
const DB_CONFIG = rfr('/server/config/dbConfig');       // Database information
const RESPONSE = rfr('/server/responseMessages/index'); // Error/Success responses.
const REGEX = rfr('/server/regex/index');               // Regular expressions.
const hashedAuthentication = rfr('/server/authentication/userLogin');  //Generates hashed credentials

////////////////////////////////////////////////////////////////////////////////
// Database
////////////////////////////////////////////////////////////////////////////////
mongoose.Promise = global.Promise;
mongoose.connect(DB_CONFIG['CONN_STRING']); // Connect to the database.

const User = rfr('/server/models/User'); // Database model for a User.

////////////////////////////////////////////////////////////////////////////////
// Route definition
////////////////////////////////////////////////////////////////////////////////
const signup = (req, res, next) => {

  // Get username and password.
  const username = req.body.username;
  const password = req.body.password;

  // Check if username and password are provided.
  if (!username || !password) {
    return next(RESPONSE.ERROR.SIGNUP.MISSING_CREDENTIALS);
  }

  // Check to see if the username and password are valid.
  if (!REGEX.username.test(username)) {
    return next(RESPONSE.ERROR.SIGNUP.INVALID_USERNAME);
  } else if (!REGEX.password.test(password)) {
    return next(RESPONSE.ERROR.SIGNUP.INVALID_PASSWORD);
  }

  // Search the collection by username.
  User.find({username: username}, (err, results) => {

    // Error checking.
    if (err) {
      return next(RESPONSE.ERROR.DB.DB_ERROR);
    }

    // Check if the username has been found.
    if (results.length == 0) {

      // Generate salt.
      const salt = hashedAuthentication.generateSalt(password.length);

      // No username found, create new user.
      const newUser = User({
        username: username,
        password: hashedAuthentication.generateHashedPassword(password, salt)
      });

      // Save the user.
      newUser.save((err) => {

        // Error check.
        if (err) {
          return next(RESPONSE.ERROR.DB.DB_ERROR);
        }

        // Return success message.
        return res.send(RESPONSE.SUCCESS.SIGNUP.USER_CREATED);

      });

    } else {

      // User already exists. Return error message.
      return next(RESPONSE.ERROR.SIGNUP.EXISTING_USER);

    }

  });

}

// Export route definition.
module.exports = signup;
