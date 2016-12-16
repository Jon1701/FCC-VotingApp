const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Vote = mongoose.model('Vote', new Schema({
  username: String,
  poll_id: String,
  choice: String,
  creationDate: { type: Date, default: Date.now }
}));

module.exports = Vote;
