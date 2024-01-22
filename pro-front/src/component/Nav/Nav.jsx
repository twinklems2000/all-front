import React, { useState, useEffect } from 'react';
import './nav.css';
import { useNavigate } from 'react-router-dom';
import { toastService } from '../../data';

const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('user');
  const [data, setData] = useState([]);

  const dataOne = [
    {
      title: 'Home',
      path: '',
    },
    {
      title: 'Add',
      path: 'add',
    },
    {
      title: 'Profile',
      path: 'profile',
    },
    {
      title: 'Log Out',
      path: 'login',
    },
  ];

  const dataNew = [
    {
      title: `${auth ? 'Log Out' : 'Sign Up'}`,
      path: 'signup',
    },
    {
      title: 'Login',
      path: 'login',
    },
  ];

  useEffect(() => {
    if (auth) {
      setData(dataOne);
    } else {
      setData(dataNew);
    }
  }, [auth]);

  return (
    <>
      <div className="nav">
        {/* <button>&#9776;</button>  code for humburger menu */}
        {data?.map((item, index) => {
          return (
            <p
              key={index}
              onClick={() => {
                navigate(item.path);
                if (item.title === 'Log Out') {
                  localStorage.clear();
                  toastService.success('Log Out successfully 🦄');
                } else return;
              }}
            >
              {item.title}
            </p>
          );
        })}
        {auth && <p>😊 {JSON.parse(auth)?.name}</p>}
      </div>
    </>
  );
};

export default Nav;
