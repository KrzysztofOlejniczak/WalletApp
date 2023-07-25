const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blacklistedTokens = new Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: '1d' }, // Tokens will be automatically removed after 1 day
});

const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokens);

module.exports = BlacklistedToken;
