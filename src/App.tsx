/** @format */

import { Route, Routes } from 'react-router';
import { Container } from '@mui/material';
import { Outlet } from 'react-router';

import LoginPage from './app/auth/login';
import RegisterPage from './app/auth/register';
import DashboardPage from './app/dashboard';

const App = () => {
  return (
    <Routes>
      <Route index element={<div>Home</div>}></Route>
      <Route path='dashboard' element={<DashboardPage />}></Route>
      <Route element={<RootLayout />}>
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

const RootLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default App;
