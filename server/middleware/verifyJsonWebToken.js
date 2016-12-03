////////////////////////////////////////////////////////////////////////////////
// Modules
////////////////////////////////////////////////////////////////////////////////
const jwt = require('jsonwebtoken');  // JSON web token.
const rfr = require('rfr');           // Root relative paths.

////////////////////////////////////////////////////////////////////////////////
// Constants
////////////////////////////////////////////////////////////////////////////////
const RESPONSE = rfr('/server/responseMessages/index');        // Error/Success responses.
const APP_CONFIG = rfr('/server/config/appConfig');  // Application configuration variables

////////////////////////////////////////////////////////////////////////////////
// Middleware definition
////////////////////////////////////////////////////////////////////////////////
const verifyJsonWebToken = (req, res, next) => {

  // Access the token in the request header.
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // Check for the existance of a json web token within the request header.
  if (token) {

    // If a token is provided, check its validity by decoding it using the
    // key used to sign it.
    jwt.verify(token, APP_CONFIG.JWT_SIGNING_KEY, (err, decoded) => {

      // Check if the token is valid.
      if (err) {

        // Token is invalid, return error as response.
        return res.json(RESPONSE.ERROR.TOKEN.INVALID_TOKEN);

      } else {

        // Token is valid, store it for future use.
        req.decoded = decoded;

        // Go to next middleware.
        next();

      }

    });

  } else {

    // No token provided, return error.
    return res.json(RESPONSE.ERROR.MISSING_TOKEN);

  }

}

// Export middleware.
module.exports = verifyJsonWebToken;
