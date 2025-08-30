/** @format */

import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { Box, Button, Container, Grid } from '@mui/material';
import { Outlet } from 'react-router';

import LoginPage from './app/auth/login';
import RegisterPage from './app/auth/register';
import DashboardPage from './app/dashboard';
import { Link } from 'react-router-dom';
import { useAuth } from './providers/AuthProvider';

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<ActionsLayout />}>
          <Route index element={<div>Home</div>}></Route>

          <Route element={<RequireAuth />}>
            <Route path='dashboard' element={<DashboardPage />}></Route>
          </Route>
        </Route>

        <Route element={<PublicOnly />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

const RequireAuth = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} replace />;
};

const PublicOnly = () => {
  const { isLoggedIn } = useAuth();
  return !isLoggedIn ? <Outlet /> : <Navigate to={'/dashboard'} replace />;
};

const RootLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};
const ActionsLayout = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {isLoggedIn ? <AuthActions /> : <GuestActions />}
      <Outlet />
    </>
  );
};

const AuthActions = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box className='flex' justifyContent={'flex-end'}>
      <Button
        variant='text'
        style={{ textTransform: 'none', color: 'black' }}
        onClick={() => {
          logout();
          navigate('/', { replace: true });
        }}
      >
        Sign Out
      </Button>
    </Box>
  );
};

const GuestActions = () => {
  return (
    <Grid container gap={3} justifyContent={'flex-end'}>
      <Grid>
        <Link to={'/login'}>Sign In</Link>
      </Grid>
      <Grid>
        <Link to={'/register'}>Sign Up</Link>
      </Grid>
    </Grid>
  );
};
export default App;
