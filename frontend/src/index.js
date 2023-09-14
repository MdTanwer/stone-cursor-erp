import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './App.css';

import { ContextProvider } from './contexts/ContextProvider';
import { Provider } from 'react-redux';
import Store from './redux/store';
import axios from 'axios';

// axios.defaults.baseURL = "http://localhost:8000/api/v2";
axios.defaults.baseURL = "https://stone-crusher-erp-base-api.vercel.app/api/v2";

// axios.defaults.baseURL = "https://role-based-eshop-framework.vercel.app/api/v2";
// axios.defaults.baseURL = "https://role-based-eshop-framework.vercel.app/api/v2";
// axios.defaults.baseURL = "https://role-based-eshop-framework-git-dev-zaf-stack.vercel.app/api/v2";
//edits
ReactDOM.render(
  <Provider store={Store}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Provider>,
  document.getElementById('root')
);
