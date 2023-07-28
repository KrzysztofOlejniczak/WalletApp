const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET;
const REFRESH = process.env.REFRESH;

const generateAccessToken = (id) => {
  return jwt.sign({ id }, SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, REFRESH, { expiresIn: '1w' });
};

const generateTokens = (id) => {
  const token = generateAccessToken(id);
  const refresh = generateRefreshToken(id);

  return { token, refresh };
};

module.exports = { generateAccessToken, generateRefreshToken, generateTokens };
