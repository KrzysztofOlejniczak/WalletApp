import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalLogoutOpen: false,
  isModalAddTransactionOpen: false,
  isModalEditTransactionOpen: false,
  isLoading: false,
  asyncRequestsCounter: 0,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      const { modalName, isOpen } = action.payload;
      state[modalName] = isOpen;
    },
    startAsyncRequest: (state) => {
      state.asyncRequestsCounter++;
      state.isLoading = true;
    },
    finishAsyncRequest: (state) => {
      state.asyncRequestsCounter--;
      state.isLoading = state.asyncRequestsCounter > 0;
    },
  },
});

export const { setModalOpen, startAsyncRequest, finishAsyncRequest } =
  globalSlice.actions;

// export const financeReducer = financeSlice.reducer;
export const globalReducer = globalSlice.reducer;
