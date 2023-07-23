const Transaction = require('../../service/schemas/transactions');
const categoryList = require('../../data/categories.json');

const createTransaction = async (req, res, next) => {
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

const getTransactions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const owner = req.user._id;

    const results = await Transaction.find({ owner }, { owner: 0, __v: 0 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(results);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const removeTransaction = async (req, res, next) => {
  const owner = req.user._id;
  const { id } = req.params;

  console.log(req.params);

  try {
    const result = await Transaction.findByIdAndRemove({ _id: id, owner });
    if (result) {
      res.status(200).json({
        _id: result._id,
        isExpense: result.isExpense,
        amount: result.amount,
        date: result.date,
        comment: result.comment,
        category: result.category,
        message: 'Transaction deleted',
      });
    } else {
      res.status(404).json({ message: `Transaction ${id} not found` });
    }
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

const getCategoriesList = (req, res) => {
  res.status(200).json(categoryList);
};

module.exports = {
  createTransaction,
  getTransactions,
  removeTransaction,
  getBalance,
  getCategoriesList,
};
