import React from 'react';
import Nav from '../../components/common/nav/Nav';
import { Outlet, useNavigate } from 'react-router-dom';

const MainLayOut = () => {
  const auth = localStorage.getItem('auth');
  const navigate = useNavigate();

  if (auth === undefined) {
    return navigate('/');
  }

  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [third])

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default MainLayOut;
