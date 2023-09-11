import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { unitmasterReducer } from "./reducers/unitmaster";
import bankReducer from "./bankDetails/bankDetailsSlice";
import customerReducer from "./customer/customerSlice";
import vendorReducer from "./vendor/vendorSlice";
// import { materialmasterReducer } from "./reducers/material";

const Store = configureStore({
  reducer: {
    user: userReducer,
    unitmaster: unitmasterReducer,
    // materialMaster: materialmasterReducer,
    bank: bankReducer,
    customer: customerReducer,
    vendor: vendorReducer,
  },
});

export default Store;
