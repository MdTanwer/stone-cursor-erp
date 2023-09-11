import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  success: false,
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // Create customer
    createNewCustomerReq: (state) => {
      state.isLoading = true;
    },
    createNewCustomer: (state, action) => {
      state.isLoading = false;
      state.customerDetails = action.payload;
      state.success = true;

      // console.log(action.payload);
    },
    createNewCustomerFail: (state, action) => {
      state.error = action.payload;
      state.success = false;
    },

    // delete customer by id
    deleteCustomerRequest: (state) => {
      state.isLoading = true;
    },
    deleteCustomer: (state, action) => {
      state.isLoading = false;
      state.deleteSuccess = true;
      state.message = action.payload;
    },
    deleteCustomerFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.deleteSuccess = false;
    },
    updateCustomerReq: (state) => {
      state.isLoading = true;
    },
    updateCustomer: (state, action) => {
      state.isLoading = false;
      state.updateSuccess = true;
    },
    updateCustomerFail: (state, action) => {
      state.error = action.payload;
      state.updateSuccess = false;
    },
  },
});

export const {
  createNewCustomerReq,
  createNewCustomer,
  createNewCustomerFail,
  deleteCustomerRequest,
  deleteCustomer,
  deleteCustomerFailed,
  updateCustomerReq,
  updateCustomer,
  updateCustomerFail,
} = customerSlice.actions;

export default customerSlice.reducer;
