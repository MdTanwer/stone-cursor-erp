import React, { useEffect, useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Navigate,
} from 'react-router-dom';

import {
  SignupPage,
  ActivationPage,
  LoginWrapper,
  ScDashboard,
  NotFoundPage,
} from './routes/Routes.js';

import {
  TransactionSidebar,
  CrusherPurchaseEntryPage,
  FreightEntry,
  MaintanancePage,
  ExpensesPage,
  PaymentRecivedPage,
  PaymentAmountPage,
  InvoicePage
} from './routes/transaction.js';
import {
  UnitMasterPage,
  Customer,
  MaterialPage,
  VehiclePage,
  DestinationPage,
  TransportPage,
  DriverMasterPage,
  VendorMasterPage,
  SupplierMasterPage,
  SourcePage,
  MaterialRatePage,
  LoaderMasterPage,
  LoadTypePage,
  PetrolPumpPage,
  ChallanEntryPage,
  EmployeePage,
  FuelExpensesPage,
  MiningRoyaltyPage
} from './routes/master.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './redux/store';
import { loadSeller, loadUser } from './redux/actions/user';
import './index.css';
import SideBar from './components/SideBar/SideBar';
import ProtectedRoute from './routes/ProtectedRoute';
// import { getAllUnitMaster } from "./redux/actions/unitmaster.js";
// import NotFound from "./components/notFound.jsx";

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
    // Store.dispatch(loadSeller());
    // Store.dispatch(getAllUnitMaster());
    // Store.dispatch(getAllEvents());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginWrapper />} />
        <Route path='/sign-up' element={<SignupPage />} />
        {/* <Route path="/sign-up" element={<SignupPage />} /> */}
        <Route
          path='/activation/:activation_token'
          element={<ActivationPage />}
        />
      </Routes>

      <SideBar>
        <div className='App'>
          <div className='auth-wrapper'>
            <div className='auth-inner'>
              <Routes>
                <Route
                  path='/'
                  element={
                    <ProtectedRoute>
                      <ScDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* // start   route for   TransactionSidebar   */}

                <Route
                  path='/transaction/crusher-purchase-entry'
                  element={
                    <ProtectedRoute>
                      <CrusherPurchaseEntryPage />
                    </ProtectedRoute>
                  }
                />
                {/* <Route
                  path="transaction/payment/recipt"
                  element={
                    <ProtectedRoute>
                      <PaymentReciptPage />
                    </ProtectedRoute>
                  }
                /> */}
                <Route
                  path='transaction/payment-recieved-amount'
                  element={
                    <ProtectedRoute>
                      <PaymentRecivedPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='transaction/payment-amount'
                  element={
                    <ProtectedRoute>
                      <PaymentAmountPage />
                    </ProtectedRoute>
                  }
                />
                {/* <Route
                  path="/transaction/freight-entry"
                  element={
                    <ProtectedRoute>
                      <FreightEntry />
                    </ProtectedRoute>
                  }
                /> */}
                <Route
                  path='/expense/daily-expense'
                  element={
                    <ProtectedRoute>
                      <ExpensesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/expense/maintanance'
                  element={
                    <ProtectedRoute>
                      <MaintanancePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/transaction/invoice'
                  element={
                    <ProtectedRoute>
                      <InvoicePage />
                    </ProtectedRoute>
                  }
                />
                {/* <Route path="sales" element={<Sales />} />
            <Route path="receipt-payment" element={<ReceiptPayment />} />
            <Route path="voucher-entry" element={<VoucherEntry />} />
            <Route path="receipt" element={<Receipt />} /> */}
                {/* </Route> */}

                {/* start   route for   TransactionSidebar  */}

                <Route
                  path='/master/unit'
                  element={
                    <ProtectedRoute>
                      <UnitMasterPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/transaction/chalan-entry'
                  element={
                    <ProtectedRoute>
                      <ChallanEntryPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/master/loader-master'
                  element={
                    <ProtectedRoute>
                      <LoaderMasterPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/master/load-type'
                  element={
                    <ProtectedRoute>
                      <LoadTypePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/master/royalty"
                  element={
                    <ProtectedRoute>
                      <MiningRoyaltyPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/master/destination'
                  element={
                    <ProtectedRoute>
                      <DestinationPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path='/vehicle/vehicle-master'
                  element={
                    <ProtectedRoute>
                      <VehiclePage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path='/master/material'
                  element={
                    <ProtectedRoute>
                      <MaterialPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path='/chalan-entry'
                  element={
                    <ProtectedRoute>
                      <ChallanEntryPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/master/customer-party'
                  element={
                    <ProtectedRoute>
                      <Customer />
                    </ProtectedRoute>
                  }
                />
                {/* <Route
                  path="/master/transport"
                  element={
                    <ProtectedRoute>
                      <TransportPage />
                    </ProtectedRoute>
                  }
                /> */}
                <Route
                  path='/master/loaded-type'
                  element={
                    <ProtectedRoute>
                      <LoadTypePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/vehicle/driver-master'
                  element={
                    <ProtectedRoute>
                      <DriverMasterPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/master/vendor'
                  element={
                    <ProtectedRoute>
                      <VendorMasterPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/master/supplier'
                  element={
                    <ProtectedRoute>
                      <SupplierMasterPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/master/source'
                  element={
                    <ProtectedRoute>
                      <SourcePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/master/materialrate'
                  element={
                    <ProtectedRoute>
                      <MaterialRatePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/master/load-type'
                  element={
                    <ProtectedRoute>
                      <LoadTypePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/master/fuel-pump'
                  element={
                    <ProtectedRoute>
                      <PetrolPumpPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/staff/employee'
                  element={
                    <ProtectedRoute>
                      <EmployeePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/vehicle/transport-master'
                  element={
                    <ProtectedRoute>
                      <TransportPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/expense/fuel-expenses'
                  element={
                    <ProtectedRoute>
                      <FuelExpensesPage />
                    </ProtectedRoute>
                  }
                />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </SideBar>

      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </Router>
  );
};

export default App;
