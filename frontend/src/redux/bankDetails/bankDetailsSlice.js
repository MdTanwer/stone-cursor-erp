import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accountHolderName: '',
  bankName: '',
  accountNumber: '',
  ifscCode: '',
  branchAddress: '',
  accountType: '',
};

export const bankSlice = createSlice({
  name: 'bankDetails',
  initialState,
  reducers: {
    addBankDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addBankDetails } = bankSlice.actions;

export default bankSlice.reducer;
