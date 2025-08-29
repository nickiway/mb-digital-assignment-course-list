/** @format */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router';
import { store } from './app/lib/store.ts';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <ToastContainer />
      </Router>
    </Provider>
  </StrictMode>
);
