// Create, sign, verify JSON web tokens.
const jwt = require('jsonwebtoken');

// Log requests to console.
const morgan = require('morgan');

////////////////////////////////////////////////////////////////////////////////
// Express
////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const app = express();

// Use morgan to log requests to console.
app.use(morgan('dev'));

// Gets parameters from requests.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

////////////////////////////////////////////////////////////////////////////////
// Mongoose and database connection
////////////////////////////////////////////////////////////////////////////////

// Get username, password, and database name.
const dbConfig = {
  username: process.env['DBUSER'],
  password: process.env['DBPASSWORD'],
  database: process.env['DBNAME'],
  domain: 'ds111178.mlab.com',
  port: 11178
}

// Database connection string.
const dbConnectionString = 'mongodb://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.domain + ':' + dbConfig.port + '/' + dbConfig.database;

// Connect to the database.
const mongoose = require('mongoose');
mongoose.connect(dbConnectionString);

////////////////////////////////////////////////////////////////////////////////
// User signup.
////////////////////////////////////////////////////////////////////////////////
app.post('/signup', (req, res, next) => {

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

  res.send('Username creation successful.');

});

////////////////////////////////////////////////////////////////////////////////
// Serve files from the ./dist folder.
////////////////////////////////////////////////////////////////////////////////
app.use(express.static('dist'));

////////////////////////////////////////////////////////////////////////////////
// Route to handle errors.
////////////////////////////////////////////////////////////////////////////////
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({error: err});
});

////////////////////////////////////////////////////////////////////////////////
// Server.
////////////////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening for connections on PORT ' + port);
});
