import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalLogoutOpen: false,
  isModalAddTransactionOpen: false,
  isLoading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      const { modalName, isOpen } = action.payload;
      state[modalName] = isOpen;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setModalOpen, startLoading, stopLoading } = globalSlice.actions;

// export const financeReducer = financeSlice.reducer;
export const globalReducer = globalSlice.reducer;
