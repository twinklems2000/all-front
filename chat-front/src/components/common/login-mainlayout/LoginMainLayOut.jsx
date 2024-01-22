import React from 'react';
import './loginMainLayOut.css';

const LoginMainLayOut = ({ headerTitle, children }) => {
  return (
    <>
      <div className="mainContainer">
        <div className="form"></div>
        <div className="form">
          <h2 className="titleText">{headerTitle}</h2>
          {children}
        </div>
      </div>
    </>
  );
};

export default LoginMainLayOut;
