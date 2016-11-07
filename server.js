// Express.
var express = require('express');
var app = express();

////////////////////////////////////////////////////////////////////////////////
// Routes.
////////////////////////////////////////////////////////////////////////////////
app.get('/test', (req, res) => {
  return res.send("hello world");
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
  res.status(500).send('Something broke!');
});

////////////////////////////////////////////////////////////////////////////////
// Server.
////////////////////////////////////////////////////////////////////////////////
var port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening for connections on PORT ' + port);
});