import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/operations';
import {
  fetchTransactions,
  fetchBalance,
  addTransaction,
  deleteTransaction,
} from './operations.js';

const financeSlice = createSlice({
  name: 'finance',
  initialState: {
    transactions: [],
    balance: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(fetchBalance.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
        state.error = null;
      })
      .addCase(addTransaction.pending, (state) => {
        state.error = null;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
        state.error = null;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload.id
        );
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
