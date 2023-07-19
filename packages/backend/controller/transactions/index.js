const Transaction = require('../../service/schemas/transactions');
const { validationTransactionCreateSchema } = require('../../validation');

const create = async (req, res, next) => {
  const { type, amount, date, comment, category } = req.body;
  const owner = req.user._id;
  try {
    const { error } = validationTransactionCreateSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const newTransaction = new Transaction({
        type,
        amount,
        date,
        comment,
        category,
        owner,
      });

      await newTransaction.save();

      res.status(201).json({
        transaction: newTransaction,
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = { create };
