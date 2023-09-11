import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  success: false,
};

export const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    // Create customer
    createNewSupplierReq: (state) => {
      state.isLoading = true;
    },
    createNewSupplier: (state, action) => {
      state.isLoading = false;
      state.customerDetails = action.payload;
      state.success = true;

      // console.log(action.payload);
    },
    createNewSupplierFail: (state, action) => {
      state.error = action.payload;
      state.success = false;
    },

    // delete customer by id
    deleteSupplierRequest: (state) => {
      state.isLoading = true;
    },
    deleteSupplier: (state, action) => {
      state.isLoading = false;
      state.deleteSuccess = true;
      state.message = action.payload;
    },
    deleteSupplierFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.deleteSuccess = false;
    },
    updateSupplierReq: (state) => {
      state.isLoading = true;
    },
    updateSupplier: (state, action) => {
      state.isLoading = false;
      state.updateSuccess = true;
    },
    updateSupplierFail: (state, action) => {
      state.error = action.payload;
      state.updateSuccess = false;
    },
  },
});

export const {
  createNewSupplierReq,
  createNewSupplier,
  createNewSupplierFail,
  deleteSupplierRequest,
  deleteSupplier,
  deleteSupplierFailed,
  updateSupplierReq,
  updateSupplier,
  updateSupplierFail,
} = supplierSlice.actions;

export default supplierSlice.reducer;
