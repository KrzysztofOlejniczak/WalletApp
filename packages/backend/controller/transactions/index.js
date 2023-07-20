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
      _id: newTransaction._id,
      isExpense,
      amount,
      date,
      comment,
      category: newTransaction.category,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getBalance = async (req, res, next) => {
  const owner = req.user._id;
  let balance = 0;
  try {
    const transactions = await Transaction.find({ owner });

    transactions.forEach((el) => {
      if (el.isExpense) {
        balance = balance - el.amount;
      } else {
        balance = balance + el.amount;
      }
    });

    res.status(200).json({ balance });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = { create, getBalance };
