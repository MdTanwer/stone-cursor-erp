import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  success: false,
};

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    // Create vendor
    createNewVendorReq: (state) => {
      state.isLoading = true;
    },
    createNewVendor: (state, action) => {
      state.isLoading = false;
      state.vendorDetails = action.payload;
      state.success = true;

      console.log(action.payload);
    },
    createNewVendorFail: (state, action) => {
      state.error = action.payload;
      state.success = false;
    },

    // delete vendor by id
    deleteVendorRequest: (state) => {
      state.isLoading = true;
    },
    deleteVendor: (state, action) => {
      state.isLoading = false;
      state.deleteSuccess = true;
      state.message = action.payload;
    },
    deleteVendorFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.deleteSuccess = false;
    },
    updateVendorReq: (state) => {
      state.isLoading = true;
    },
    updateVendor: (state, action) => {
      state.isLoading = false;
      state.updateSuccess = true;
    },
    updateVendorFail: (state, action) => {
      state.error = action.payload;
      state.updateSuccess = false;
    },
  },
});

export const {
  createNewVendorReq,
  createNewVendor,
  createNewVendorFail,
  deleteVendorRequest,
  deleteVendor,
  deleteVendorFailed,
  updateVendorReq,
  updateVendor,
  updateVendorFail,

  // createNewCustomerReq,
  // createNewCustomer,
  // createNewCustomerFail,
  // deleteCustomerRequest,
  // deleteCustomer,
  // deleteCustomerFailed,
  // updateCustomerReq,
  // updateCustomer,
  // updateCustomerFail,
} = vendorSlice.actions;

export default vendorSlice.reducer;
