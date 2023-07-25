import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/operations';
import {
  fetchTransactions,
  fetchBalance,
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchCategories,
} from './operations.js';

const handlePending = (state) => {};

const handleRejected = (state, action) => {
  state.error = action.payload;
};

const financeSlice = createSlice({
  name: 'finance',
  initialState: {
    transactions: [],
    balance: null,
    error: null,
    categories: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, handlePending)
      .addCase(fetchTransactions.rejected, handleRejected)
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(fetchBalance.pending, handlePending)
      .addCase(fetchBalance.rejected, handleRejected)
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
        state.error = null;
      })
      .addCase(addTransaction.pending, handlePending)
      .addCase(addTransaction.rejected, handleRejected)
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
        state.error = null;
      })
      .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.rejected, handleRejected)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        );
        state.error = null;
      })
      .addCase(editTransaction.pending, handlePending)
      .addCase(editTransaction.rejected, handleRejected)
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.rejected, handleRejected)
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.transactions = [];
        state.balance = null;
        state.error = null;
      });
  },
});

export const financeReducer = financeSlice.reducer;
