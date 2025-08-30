/** @format */

import { Navigate } from 'react-router';
import { userLogged } from '../utils/auth';
import CourseList from './components/CourseList';

const DashboardPage = () => {
  if (!userLogged()) {
    return <Navigate to={'/login'} replace />;
  }
  return (
    <>
      <div>DashboardPage</div>
      <CourseList />
    </>
  );
};

export default DashboardPage;
