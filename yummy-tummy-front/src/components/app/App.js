import React from 'react';
import RootRoutes from './route/RootRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from '../ContextReducer';

const App = () => {
  return (
    <>
      <CartProvider>
        <ToastContainer autoClose={500} hideProgressBar={true} />
        <RootRoutes />
      </CartProvider>
    </>
  );
};

export default App;
