const BlacklistedToken = require('../service/schemas/blacklistedTokens');

const checkBlacklist = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const blacklistedToken = await BlacklistedToken.findOne({ token });

    if (blacklistedToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkBlacklist;
