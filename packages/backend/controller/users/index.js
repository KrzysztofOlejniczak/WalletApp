const User = require('../../service/schemas/users');
const BlacklistedToken = require('../../service/schemas/blacklistedTokens');
const RefreshToken = require('../../service/schemas/refreshTokens');
const { generateTokens } = require('../../utils/tokens');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {
  validationUserRegisterSchema,
  validationUserLoginSchema,
} = require('../../validation');

const REFRESH = process.env.REFRESH;

const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const { error } = validationUserRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    } else {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({
          message: 'Email in use',
        });
      }
      try {
        const newUser = new User({ email, name });
        newUser.setPassword(password);

        const id = newUser.id;

        const { token, refresh } = generateTokens(id);

        const refreshToken = new RefreshToken({ refresh });
        await refreshToken.save();

        await newUser.save();

        res.status(201).json({
          token: token,
          refresh: refresh,
          user: {
            email: newUser.email,
            name: newUser.name,
          },
        });
      } catch (error) {
        next(error);
      }
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { error } = validationUserLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    } else {
      const user = await User.findOne({ email });

      if (!user || !user.validPassword(password)) {
        return res.status(401).json({
          message: 'Wrong email or password',
        });
      }

      const id = user.id;

      const { token, refresh } = generateTokens(id);

      user.setRefresh(refresh);

      const refreshToken = new RefreshToken({ refresh });
      await refreshToken.save();

      await user.save();

      res.status(200).json({
        token: token,
        refresh: user.refresh,
        user: {
          email: user.email,
          name: user.name,
        },
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findOne({ _id });

  if (!user) {
    return res.status(401).json({
      message: 'Not authorized',
    });
  }

  try {
    const token = req.header('Authorization').split(' ')[1];
    const refresh = user.refresh;

    const blacklistedToken = new BlacklistedToken({ token });
    await blacklistedToken.save();

    user.setRefresh(null);

    await RefreshToken.findOneAndDelete({ refresh });

    await user.save();

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  const { refresh } = req.body;

  const refreshToken = await RefreshToken.findOne({ refresh });

  if (!refreshToken) {
    return res.status(403).json({
      message: 'Invalid refresh token',
    });
  }

  try {
    const decodedRefreshToken = jwt.verify(refreshToken.refresh, REFRESH);
    const user = await User.findById(decodedRefreshToken.id);

    if (!user) {
      return res.status(403).json({
        message: 'Invalid refresh token',
      });
    }

    await RefreshToken.findOneAndDelete({ refresh: refreshToken.refresh });

    const { token, refresh: newRefreshToken } = generateTokens(user._id);

    RefreshToken.create({ refresh: newRefreshToken });

    user.setRefresh(newRefreshToken);
    await user.save();

    res.status(200).json({
      token: token,
      refresh: user.refresh,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, logout, getCurrent, refresh };
