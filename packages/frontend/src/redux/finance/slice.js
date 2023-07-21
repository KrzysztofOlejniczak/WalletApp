import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/operations';
import {
  fetchTransactions,
  fetchBalance,
  addTransaction,
  deleteTransaction,
} from './operations.js';

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

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
      .addCase(fetchTransactions.pending, handlePending)
      .addCase(fetchTransactions.rejected, handleRejected)
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchBalance.pending, handlePending)
      .addCase(fetchBalance.rejected, handleRejected)
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
        state.loading = false;
        state.error = null;
      })
      .addCase(addTransaction.pending, handlePending)
      .addCase(addTransaction.rejected, handleRejected)
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.rejected, handleRejected)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload.id
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.transactions = [];
        state.balance = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const financeReducer = financeSlice.reducer;
