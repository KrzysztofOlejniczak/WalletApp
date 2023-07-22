import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

const initialState = {
  // email: null,
  name:null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  // error: null,
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
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        // state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        // state.email = null;
        state.name = null;
        state.token=null;
        state.isLoggedIn = false;
        // state.items = [];
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        // state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(logIn.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(register.rejected, (state,action) => {
        state.isRefreshing = false;
        state.error=action.payload
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase((state) => {
        state.error = 'Error';
      });
  },
});

export const authReducer = authSlice.reducer;
