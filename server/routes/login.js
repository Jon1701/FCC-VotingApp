// Mongoose.
const mongoose = require('mongoose');

// Connect to the database.
const dbConfig = require('../config/dbConfig');
mongoose.createConnection(dbConfig['connString']);

// Database model.
const User = require('../models/User');

// Route definition.
const login = (req, res, next) => {
  
  // Get username and password.
  const username = req.body.username;
  const password = req.body.password;

  // Check if username and password are provided.
  if (!username || !password) {
    return next('Both a username and password are required.');
  }

  res.json('login route');
}

// Export route definition.
module.exports = login;
