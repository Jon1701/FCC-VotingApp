////////////////////////////////////////////////////////////////////////////////
// Module dependencies
////////////////////////////////////////////////////////////////////////////////
const mongoose = require('mongoose'); // MongoDB database driver.

////////////////////////////////////////////////////////////////////////////////
// Externals
////////////////////////////////////////////////////////////////////////////////
const dbConfig = require('../config/dbConfig');                       // Database information
const errorMessages = require('../responseMessages/error');           // Error messages.
const successMessages = require('../responseMessages/success')        // Success messages.
const hashedAuthentication = require('../authentication/userLogin');  // Generates hashed credentials
const regexRules = require('../regex/index');                         // Regular expressions.

////////////////////////////////////////////////////////////////////////////////
// Database
////////////////////////////////////////////////////////////////////////////////
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig['connString']); // Connect to the database.

const User = require('../models/User'); // User model.

////////////////////////////////////////////////////////////////////////////////
// Route definition
////////////////////////////////////////////////////////////////////////////////
const signup = (req, res, next) => {

  // Get username and password.
  const username = req.body.username;
  const password = req.body.password;

  // Check if username and password are provided.
  if (!username || !password) {
    return next(errorMessages.SIGNUP.NO_CREDENTIALS);
  }

  // Check to see if the username and password are valid.
  if (!regexRules.username.test(username)) {
    return next(errorMessages.SIGNUP.INVALID_USERNAME);
  } else if (!regexRules.password.test(password)) {
    return next(errorMessages.SIGNUP.INVALID_PASSWORD);
  }

  // Search the collection by username.
  User.find({username: username}, (err, results) => {

    // Error checking.
    if (err) {
      return next(errorMessages.SIGNUP.NO_DB_CONNECTION);
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
          return next(errorMessages.SIGNUP.NO_DB_CONNECTION);
        }

        // Return success message.
        return res.send(successMessages.SIGNUP.USER_CREATED);

      });

    } else {

      // User already exists. Return error message.
      return next(errorMessages.SIGNUP.USER_EXISTS);

    }

  });

}

// Export route definition.
module.exports = signup;
