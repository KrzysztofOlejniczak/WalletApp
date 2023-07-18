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
        status: 'Bad request',
        code: 400,
        data: null,
        message: error.message,
      });
    } else {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({
          status: 'Conflict',
          code: 409,
          data: null,
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
          status: 'Created',
          code: 201,
          data: {
            token: newUser.token,
            user: {
              email: newUser.email,
              name: newUser.name,
            },
          },
          message: null,
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
        status: 'Bad request',
        code: 400,
        data: null,
        message: error.message,
      });
    } else {
      const user = await User.findOne({ email });

      if (!user || !user.validPassword(password)) {
        return res.status(401).json({
          status: 'Unauthorized',
          code: 401,
          data: null,
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
        status: 'Success',
        code: 200,
        data: {
          token: user.token,
          user: {
            email: user.email,
            name: user.name,
          },
        },
        message: null,
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = { signup, login };
