const User = require('../../service/schemas/users');
const Joi = require('joi');
// const jwt = require('jsonwebtoken');
require('dotenv').config();
// const secret = process.env.SECRET;

const validationUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      /^.*(?=.{6,12})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'password'
    )
    .required(),
});

// const validationEmail = Joi.object({
//   email: Joi.string().email().required(),
// });

const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const { error } = validationUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Bad request',
        code: 400,
        message: error.message,
        data: null,
      });
    } else {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({
          status: 'Confilct',
          code: 409,
          message: 'Email in use',
          data: null,
        });
      }
      try {
        const newUser = new User({ email, name });
        newUser.setPassword(password);
        await newUser.save();

        res.status(201).json({
          status: 'Created',
          code: 201,
          data: {
            user: {
              email: newUser.email,
              subscription: newUser.subscription,
            },
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

module.exports = { signup };
