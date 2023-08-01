import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  refreshUser,
  refreshAccessToken,
} from './operations';

const initialState = {
  name: null,
  token: null,
  refresh: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.name = action.payload.user.name;
        state.token = action.payload.token;
        state.refresh = action.payload.refresh;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.name = action.payload.user.name;
        state.token = action.payload.token;
        state.refresh = action.payload.refresh;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.name = null;
        state.token = null;
        state.refresh = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.name = action.payload.user.name;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refresh = action.payload.refresh;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.name = null;
        state.token = null;
        state.refresh = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase((state) => {
        state.error = 'Error';
      });
  },
});

export const authReducer = authSlice.reducer;
