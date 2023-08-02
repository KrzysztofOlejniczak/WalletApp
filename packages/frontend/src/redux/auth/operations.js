import { createAsyncThunk } from '@reduxjs/toolkit';
import { startAsyncRequest, finishAsyncRequest } from '../global/slice';
import { notifyError } from '../../utils/notifies';
import { closeModal } from '../../redux/global/operations';
import { axiosAPI, clearAuthHeader, setAuthHeader } from '../../utils/axios';

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    thunkAPI.dispatch(startAsyncRequest());

    try {
      const res = await axiosAPI.post('/users/signup', credentials);
      // After successful registration, add the token to the HTTP header
      setAuthHeader(res.data.token);

      return res.data;
    } catch (error) {
      if (error.response.status === 409) {
        notifyError('Email is already in use !');
      } else {
        notifyError(error.message);
      }

      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(finishAsyncRequest());
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    thunkAPI.dispatch(startAsyncRequest());
    try {
      const res = await axiosAPI.post('/users/login', credentials);
      // After successful login, add the token to the HTTP header
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      if (error.response.status === 400) {
        notifyError('Email or password is incorect !');
      } else {
        notifyError(error.message);
      }
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(finishAsyncRequest());
    }
  }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  thunkAPI.dispatch(startAsyncRequest());
  try {
    await axiosAPI.post('/users/logout');
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
    thunkAPI.dispatch(closeModal('isModalLogoutOpen'));
  } catch (error) {
    notifyError(error.message);
    return thunkAPI.rejectWithValue(error.message);
  } finally {
    thunkAPI.dispatch(finishAsyncRequest());
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    thunkAPI.dispatch(startAsyncRequest());

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(persistedToken);
      const res = await axiosAPI.get('/users/current');
      return res.data;
    } catch (error) {
      // notifyError(error.message);
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
