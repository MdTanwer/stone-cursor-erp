// import { createReducer } from "@reduxjs/toolkit";
// const initialState = {
//   isLoading: true,
// };
// export const materialmasterReducer = createReducer(initialState, {
//   materialmasterCreateRequest: (state) => {
//     state.isLoading = true;
//   },
//   materialmasterCReateSuccess: (stata, actoin) => {
//     stata.isLoading = false;
//     stata.materialMaster = actoin.payload;
//     stata.success = true;
//   },
//   materialMasteCreateFail: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//     state.success = false;
//   },
//   getAllMaterialMasterRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllMaterialMasterSuccess: (state, action) => {
//     state.isLoading = false;
//     debugger;
//     state.materialMaster = action.payload;
//   },
//   getAllMaterialMasterFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
//   deleteMaterialMasterRequest: (state) => {
//     state.isLoading = true;
//   },
//   deleteMaterialMasterSuccess: (state, action) => {
//     state.isLoading = false;
//     state.materialMaster = action.payload;
//     state.delsuccess = true;
//   },
//   deleteMaterialMasterFailed: (state, action) => {
//     state.isLoading = false;
//   },
// });
