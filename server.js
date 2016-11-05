// Express module.
var express = require('express');
var app = express();

app.get('/hostname', function(req, res) {
  return res.json({
    hostname: req.hostname
  })
});

////////////////////////////////////////////////////////////////////////////////
// Serve files from the ./dist folder.
////////////////////////////////////////////////////////////////////////////////
app.use(express.static('dist'));

////////////////////////////////////////////////////////////////////////////////
// Route to handle errors.
////////////////////////////////////////////////////////////////////////////////
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Listening for connections on PORT ' + port);
});
