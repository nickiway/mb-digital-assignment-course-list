/** @format */

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to={'/dashboard'}>Dashboard</Link>
    </>
  );
};

export default Home;
