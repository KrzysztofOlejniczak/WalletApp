const Joi = require('joi');

const validationUserRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      /^.*(?=.{6,12})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'password'
    )
    .required(),
  name: Joi.string().min(1).max(12).allow(''),
});

const validationUserLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      /^.*(?=.{6,12})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'password'
    )
    .required(),
});

const validationYearAndMonth = Joi.object({
  month: Joi.number().integer().min(1).max(12).required(),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
});

module.exports = {
  validationUserRegisterSchema,
  validationUserLoginSchema,
  validationYearAndMonth,
};
