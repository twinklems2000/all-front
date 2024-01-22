import { Navigate } from 'react-router-dom';

const Authrole = ({ children }) => {
  const auth = localStorage.getItem('auth');

  if (auth !== null) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default Authrole;
