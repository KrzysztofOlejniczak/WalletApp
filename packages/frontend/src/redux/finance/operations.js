import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { startAsyncRequest, finishAsyncRequest } from '../global/slice';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchTransactions = createAsyncThunk(
  'finance/fetchTransactions',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Token is missing');
    }

    thunkAPI.dispatch(startAsyncRequest());

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/finance/transactions');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(finishAsyncRequest());
    }
  }
);

export const fetchBalance = createAsyncThunk(
  'finance/fetchBalance',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Token is missing');
    }

    thunkAPI.dispatch(startAsyncRequest());

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/finance/balance');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(finishAsyncRequest());
    }
  }
);

export const addTransaction = createAsyncThunk(
  'finance/addTransaction',
  async (transactionData, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Token is missing');
    }

    thunkAPI.dispatch(startAsyncRequest());

    try {
      setAuthHeader(persistedToken);
      const res = await axios.post('/finance/transactions', transactionData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(finishAsyncRequest());
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'finance/deleteTransaction',
  async (transactionId, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Token is missing');
    }

    thunkAPI.dispatch(startAsyncRequest());

    try {
      setAuthHeader(persistedToken);
      await axios.delete(`/finance/transactions/${transactionId}`);
      return transactionId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(finishAsyncRequest());
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'finance/fetchCategories',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(startAsyncRequest());

    try {
      const res = await axios.get('/finance/categories');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(finishAsyncRequest());
    }
  }
);
