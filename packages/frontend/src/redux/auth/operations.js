import { createAsyncThunk } from '@reduxjs/toolkit';
import { startAsyncRequest, finishAsyncRequest } from '../global/slice';
import { notifyError } from '../../utils/notifies';
import { closeModal } from '../../redux/global/operations';
import { axiosAPI, clearAuthHeader, setAuthHeader } from '../../utils/axios';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    thunkAPI.dispatch(startAsyncRequest());

    try {
      const res = await axiosAPI.post('/users/signup', credentials);
      setAuthHeader(res.data.token);

      return res.data;
    } catch (error) {
      notifyError(error.message);

      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(finishAsyncRequest());
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    thunkAPI.dispatch(startAsyncRequest());
    try {
      const res = await axiosAPI.post('/users/login', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      notifyError(error.message);
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(finishAsyncRequest());
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  thunkAPI.dispatch(startAsyncRequest());
  try {
    await axiosAPI.post('/users/logout');
    clearAuthHeader();
    thunkAPI.dispatch(closeModal('isModalLogoutOpen'));
  } catch (error) {
    notifyError(error.message);
    return thunkAPI.rejectWithValue(error.message);
  } finally {
    thunkAPI.dispatch(finishAsyncRequest());
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    thunkAPI.dispatch(startAsyncRequest());

    try {
      setAuthHeader(persistedToken);
      const res = await axiosAPI.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(finishAsyncRequest());
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const refreshToken = state.auth.refresh;
    thunkAPI.dispatch(startAsyncRequest());
    try {
      const response = await axiosAPI.post('/users/refresh', {
        refresh: refreshToken,
      });
      const { token, refresh } = response.data;
      return { token, refresh };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(finishAsyncRequest());
    }
  }
);
