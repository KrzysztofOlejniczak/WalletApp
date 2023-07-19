const User = require('../../service/schemas/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {
  validationUserRegisterSchema,
  validationUserLoginSchema,
} = require('../../validation');

const SECRET = process.env.SECRET;

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

        const payload = {
          id: newUser.id,
        };

        const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
        newUser.setToken(token);

        await newUser.save();

        res.status(201).json({
          token: newUser.token,
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

      const payload = {
        id: user.id,
      };
      const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

      user.setToken(token);
      await user.save();

      res.status(200).json({
        token: user.token,
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

  user.setToken(null);
  await user.save();

  return res.status(204).send();
};

module.exports = { signup, login, logout };
