// Mongoose.
const mongoose = require('mongoose');

// Settings for database access.
const dbConfig = {
  username: process.env['DBUSER'],
  password: process.env['DBPASSWORD'],
  database: process.env['DBNAME'],
  domain: process.env['DBURL'],
  port: process.env['DBPORT']
}

// Store database connection string in dbConfig.
dbConfig['connString'] = 'mongodb://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.domain + ':' + dbConfig.port + '/' + dbConfig.database;

// Connect to the database.
mongoose.connect(dbConfig['connString']);

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

  // Regex rules.
  const ruleUsername = /^[\w]{8,25}$/;
  const rulePassword = /^[\w]{8,50}$/;

  // Check to see if the username and password are valid.
  if (!ruleUsername.test(username)) {
    return next('Invalid username');
  } else if (!rulePassword.test(password)) {
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

      // No username found, create new user.
      const newUser = User({
        username: username,
        password: password
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
