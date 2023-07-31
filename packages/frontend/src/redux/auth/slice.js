import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  refreshUser,
  refreshAccessToken,
} from './operations';

const initialState = {
  // email: null,
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
        // state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.token = action.payload.token;
        state.refresh = action.payload.refresh;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        // state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.token = action.payload.token;
        state.refresh = action.payload.refresh;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        // state.email = null;
        state.name = null;
        state.token = null;
        state.refresh = null;
        state.isLoggedIn = false;
        state.error = null;
        // state.items = [];
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        // state.email = action.payload.user.email;
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
        // state.error = action.payload;
      })
      .addCase((state) => {
        state.error = 'Error';
      });
  },
});

export const authReducer = authSlice.reducer;
