/** @format */

import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router';
import { store } from './lib/store.ts';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './providers/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
      <ToastContainer />
    </Router>
  </Provider>
);
