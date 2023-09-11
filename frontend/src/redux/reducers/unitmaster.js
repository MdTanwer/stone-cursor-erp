import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
};
export const unitmasterReducer = createReducer(initialState, {
    unitmasterCreateRequest: (state) => {
        state.isLoading = true;
    },
    unitmasterCreateSuccess: (state, action) => {
        debugger;
        state.isLoading = false;
        state.unitmaster = action.payload;
        state.success = true;
    },
    unitmasterCreateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

    // get all Unit of Stone Crusher
    getAllUnitMasterRequest: (state) => {
        state.isLoading = true;
    },

    getAllUnitMasterSuccess: (state, action) => {
        state.isLoading = false;
        debugger;
        state.unitmasters = action.payload;

    },
    getAllUnitMasterFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

    },

    // delete product of a shop
    deleteUnitMasterRequest: (state) => {
        state.isLoading = true;
    },
    deleteUnitMasterSuccess: (state, action) => {
        state.isLoading = false;
        state.unitmaster = action.payload;
        state.delsuccess = true;

    },
    deleteUnitMasterFailed: (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        // state.delsuccess = false;
    },


    //update unit master
    unitmasterUpdateRequest: (state) => {
        state.isLoading = true;
    },
    unitmasterUpdateSuccess: (state, action) => {
        debugger;
        state.isLoading = false;
        state.unitmaster = action.payload;
        state.success = true;
    },
    unitmasterUpdateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },
    //    // get all products
    //    getAllProductsRequest: (state) => {
    //     state.isLoading = true;
    //   },
    //   getAllProductsSuccess: (state, action) => {
    //     state.isLoading = false;
    //     state.allProducts = action.payload;
    //   },
    //   getAllProductsFailed: (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   },
});
