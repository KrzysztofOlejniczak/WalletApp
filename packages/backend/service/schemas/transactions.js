const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categories = require('../../data/categories.json');
const categoriesName = categories.map((item) => item.name);

const transactions = new Schema({
  isExpense: {
    type: Boolean,
    required: [true, 'isExpense is required'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  comment: {
    type: String,
  },
  category: {
    type: String,
    enum: categoriesName,
    required: [true, 'Category is required'],
    default: 'Income',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Transaction = mongoose.model('Transaction', transactions);

module.exports = Transaction;
