import React from 'react';
import RootRoutes from './route/RootRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer autoClose={500} hideProgressBar={true} />
      <RootRoutes />
    </>
  );
};

export default App;
