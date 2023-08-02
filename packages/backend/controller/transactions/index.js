const Transaction = require('../../service/schemas/transactions');
const categoryList = require('../../data/categories.json');
const {
  validationYearAndMonth,
  validationTransactionSchema,
} = require('../../validation');

const createTransaction = async (req, res, next) => {
  const { isExpense, amount, date, comment, category } = req.body;
  const owner = req.user._id;

  const transaction = {
    isExpense,
    amount: amount,
    date,
    comment,
    category,
  };

  const { error } = validationTransactionSchema.validate(transaction);

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  try {
    const newTransaction = new Transaction({ ...transaction, owner });

    await newTransaction.save();

    res.status(201).json({
      _id: newTransaction._id,
      isExpense: newTransaction.isExpense,
      amount: newTransaction.amount,
      date: newTransaction.date,
      comment: newTransaction.comment,
      category: newTransaction.category,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getTransactions = async (req, res, next) => {
  try {
    const owner = req.user._id;

    const results = await Transaction.find({ owner }, { owner: 0, __v: 0 });

    res.status(200).json(results);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getMonthlyStats = async (req, res, next) => {
  const { month, year } = req.params;
  const startOfMonth = new Date(year, month - 1);
  const endOfMonth = new Date(year, month);
  const owner = req.user._id;

  const { error } = validationYearAndMonth.validate(req.params);

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  } else {
    try {
      const transactions = await Transaction.find({
        date: { $gte: startOfMonth, $lt: endOfMonth },
        owner,
      });

      const expenseTransactions = transactions.filter(
        (transaction) => transaction.isExpense === true
      );

      const expenseByCategory = categoryList
        .filter((category) => category.name !== 'Income')
        .map((category) => {
          const amountByCategory = expenseTransactions.reduce((acc, el) => {
            return acc + (el.category === category.name ? el.amount : 0);
          }, 0);
          return { category: category.name, amount: amountByCategory };
        });

      const calculateBalance = (type) => {
        const isExpense = type === 'expense';
        return transactions
          .filter((t) => t.isExpense === isExpense)
          .map((t) => t.amount)
          .reduce((acc, num) => {
            return acc + num;
          }, 0);
      };

      res.status(200).json({
        expenseByCategory,
        income: calculateBalance('income'),
        expense: calculateBalance('expense'),
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
};

const updateTransaction = async (req, res, next) => {
  const owner = req.user._id;
  const { id } = req.params;
  const { isExpense, amount, date, comment, category } = req.body;

  const transaction = {
    isExpense,
    amount: amount,
    date,
    comment,
    category,
  };

  const { error } = validationTransactionSchema.validate(transaction);

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  try {
    const result = await Transaction.findByIdAndUpdate(
      { _id: id, owner },
      { isExpense, amount: amount, date, comment, category }
    );
    if (result) {
      res.status(200).json({
        _id: result._id,
        isExpense: result.isExpense,
        amount: result.amount,
        date: result.date,
        comment: result.comment,
        category: result.category,
      });
    } else {
      res.status(404).json({
        message: `Transaction ${id} not found`,
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const removeTransaction = async (req, res, next) => {
  const owner = req.user._id;
  const { id } = req.params;

  try {
    const result = await Transaction.findByIdAndRemove({ _id: id, owner });
    if (result) {
      res.status(200).json({
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
  getMonthlyStats,
  updateTransaction,
  removeTransaction,
  getBalance,
  getCategoriesList,
};
