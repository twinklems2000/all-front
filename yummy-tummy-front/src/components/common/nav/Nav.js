import React from 'react';
import './nav.css';
import { useNavigate } from 'react-router-dom';
import { navbarData } from '../../../constant/data';

const Nav = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="nav">
        <div className="navContent">
          <p
            className="navContentText"
            style={{ fontSize: '22px', fontWeight: 'bold' }}
            onClick={() => navigate('/home')}
          >
            YᑌᗰᗰY TᑌᗰᗰY🍔
          </p>
          {navbarData?.map((item, index) => {
            return (
              <p
                className="navContentText"
                onClick={() => navigate(item?.navigate)}
                key={index}
              >
                {item?.title}
              </p>
            );
          })}
        </div>
        <div className="navContent">
          <p>{JSON.parse(localStorage.getItem('user'))?.name} 🙍‍♀️</p>
          <p
            className="navContentText"
            onClick={() => {
              navigate('/');
              localStorage.clear();
            }}
          >
            LogOut
          </p>
        </div>
      </div>
    </>
  );
};

export default Nav;
