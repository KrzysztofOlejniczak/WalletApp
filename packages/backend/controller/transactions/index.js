const Transaction = require('../../service/schemas/transactions');

const create = async (req, res, next) => {
  const { isExpense, amount, date, comment, category } = req.body;
  const owner = req.user._id;
  try {
    const newTransaction = new Transaction({
      isExpense,
      amount,
      date,
      comment,
      category,
      owner,
    });

    await newTransaction.save();

    res.status(201).json({
      transaction: {
        _id: newTransaction._id,
        isExpense,
        amount,
        date,
        comment,
        category,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = { create };
