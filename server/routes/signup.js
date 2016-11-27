// Mongoose.
const mongoose = require('mongoose');

// Connect to the database.
const dbConfig = require('../config/dbConfig');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig['connString']);

// Module for generating hashed passwords.
const hashedAuthentication = require('../authentication/userLogin');

// Module containing regular expressions
const regexRules = require('../regex/index');

// Database model.
const User = require('../models/User');

// Route definition.
const signup = (req, res, next) => {

  // Get username and password.
  const username = req.body.username;
  const password = req.body.password;

  // Check if username and password are provided.
  if (!username || !password) {
    return next('Both a username and password are required.');
  }

  // Check to see if the username and password are valid.
  if (!regexRules.username.test(username)) {
    return next('Invalid username');
  } else if (!regexRules.password.test(password)) {
    return next('Invalid password');
  }

  // Search the collection by username.
  User.find({username: username}, (err, results) => {

    // Error checking.
    if (err) {
      return next('Database error occurred.');
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
          return next('Database error. User not created.');
        }

        // Return success message.
        return res.send('User ' + username + ' successfully created.');

      });

    } else {

      // User already exists. Return error message.
      return next('User ' + username + ' already exists.');

    }

  });

}

// Export route definition.
module.exports = signup;
