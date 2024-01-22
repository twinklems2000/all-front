import React from 'react';
import './button.css';

const Button = ({ title, type, customClass, handleClick }) => {
  return (
    <button
      className={['btn', customClass].join(' ')}
      type={type}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
