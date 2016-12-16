const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Poll = mongoose.model('Poll', new Schema({
  username: String,
  title: String,
  choices: Array,
  creationDate: { type: Date, default: Date.now }
}));

module.exports = Poll;
