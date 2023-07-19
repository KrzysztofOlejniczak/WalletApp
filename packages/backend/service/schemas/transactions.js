const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactions = new Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Type is required'],
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
    required: [true, 'Comment is required'],
  },
  category: {
    type: String,
    enum: [
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
      'Entertainment',
    ],
    default: 'Income',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Transaction = mongoose.model('Transaction', transactions);

module.exports = Transaction;
