/** @format */

import { Navigate } from 'react-router';
import { userLogged } from '../utils/auth';

const DashboardPage = () => {
  if (!userLogged()) {
    return <Navigate to={'/login'} replace />;
  }
  return <div>DashboardPage</div>;
};

export default DashboardPage;
