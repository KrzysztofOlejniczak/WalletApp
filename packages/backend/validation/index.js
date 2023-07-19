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

const validationTransactionCreateSchema = Joi.object({
  type: Joi.string().valid('income', 'expense').required(),
  amount: Joi.number().required(),
  date: Joi.date().required(),
  comment: Joi.string().required(),
  category: Joi.string().valid(
    'Income',
    'Main expenses',
    'Products',
    'Car',
    'Self care',
    'Child care',
    'Household products',
    'Education',
    'Leisure',
    'Other expenses',
    'Entertainment'
  ),
});

module.exports = {
  validationUserRegisterSchema,
  validationUserLoginSchema,
  validationTransactionCreateSchema,
};
