const index = (req, res, next) => {
  return res.send('You have reached http://localhost:8080/auth/');
}

module.exports = index;
