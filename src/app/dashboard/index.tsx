/** @format */

import CourseList from './components/CourseList';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const breadcrumbs = [
    <Link key='1' color='inherit' to='/'>
      Home
    </Link>,

    <Typography key='2' sx={{ color: 'text.primary' }}>
      Dashboard
    </Typography>,
  ];
  return (
    <>
      <Breadcrumbs separator='›' aria-label='breadcrumb'>
        {breadcrumbs}
      </Breadcrumbs>

      <CourseList />
    </>
  );
};

export default DashboardPage;
