const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const refreshTokens = new Schema({
  refresh: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: '1w' },
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokens);

module.exports = RefreshToken;
