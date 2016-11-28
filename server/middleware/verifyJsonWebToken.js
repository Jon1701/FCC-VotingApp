const verifyJsonWebToken = (req, res, next) => {
  return res.json('middleware to verify json web token');
}

module.exports = verifyJsonWebToken;
