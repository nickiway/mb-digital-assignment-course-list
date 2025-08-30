/** @format */

import { Route, Routes, useNavigate } from 'react-router';
import { Button, Container, Grid } from '@mui/material';
import { Outlet } from 'react-router';

import LoginPage from './app/auth/login';
import RegisterPage from './app/auth/register';
import DashboardPage from './app/dashboard';
import { logoutUser } from './app/utils/auth';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<NotAuthLayout />}>
          <Route index element={<div>Home</div>}></Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path='dashboard' element={<DashboardPage />}></Route>
        </Route>
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

const AuthLayout = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => {
          logoutUser();
          navigate('/');
        }}
      >
        Sign Out
      </Button>

      <Outlet />
    </>
  );
};
const NotAuthLayout = () => {
  return (
    <>
      <Grid container gap={3} justifyContent={'flex-end'}>
        <Grid>
          <Link to={'/login'}>Sign In</Link>
        </Grid>
        <Grid>
          <Link to={'/register'}>Sign Up</Link>
        </Grid>
      </Grid>
      <Outlet />
    </>
  );
};
export default App;
