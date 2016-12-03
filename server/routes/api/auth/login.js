////////////////////////////////////////////////////////////////////////////////
// Module dependencies
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

////////////////////////////////////////////////////////////////////////////////
// Database
////////////////////////////////////////////////////////////////////////////////
mongoose.createConnection(DB_CONFIG['CONN_STRING']);  // Connect to the database.

const User = rfr('/server/models/User'); // Database model for a User.

////////////////////////////////////////////////////////////////////////////////
// Route definition
////////////////////////////////////////////////////////////////////////////////
const login = (req, res, next) => {

  // Get username and password.
  const username = req.body.username;
  const password = req.body.password;

  // Check if username and password are provided.
  if (!username || !password) {
    return next(RESPONSE.ERROR.LOGIN.MISSING_CREDENTIALS);
  }

  // Access the database.
  User.findOne({username: username}, (error, result) => {

    // Error check.
    if (error) { return next(RESPONSE.ERROR.DB.DB_ERROR); }

    // Check if a matching user was found.
    if (result) {

      // Get the user's salt from the database.
      const userSalt = result.password.salt;

      // Get the user's hashed password from the database.
      const userHashedPassword = result.password.hash;

      // Generate a hashed password using given plaintext password
      // and salt.
      const generatedHashedPassword = hashedAuthentication.generateHashedPassword(password, userSalt).hash;

      // Compare the stored hashed password with the generated one.
      if (userHashedPassword == generatedHashedPassword) {

        // Create a JSON web token using the username, and secret signing key, which
        // expires in 24 hours.
        const token = jwt.sign(
          {username: username},
          APP_CONFIG.JWT_SIGNING_KEY,
          {expiresIn: APP_CONFIG.JWT_TOKEN_EXPIRATION_SECONDS}
        );

        // Send jsonwebtoken as response.
        return res.json({
          message: 'Token generated',
          token: token
        });

      } else {

        // Passwords do not match, return an error.
        return next(RESPONSE.ERROR.LOGIN.INVALID_CREDENTIALS);
      }

    } else {

      // No user found, just return an error stating invalid username or password.
      return next(RESPONSE.ERROR.LOGIN.INVALID_CREDENTIALS);
    }

  });

}

// Export route definition.
module.exports = login;
