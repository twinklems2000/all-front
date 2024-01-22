import { toast } from 'react-toastify';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SetAvtar from '../pages/SetAvtar';

export const routeData = [
  {
    path: '/',
    element: <Login />,
    children: [],
    header: '',
    location: '/login',
  },
  {
    path: '/register',
    element: <Register />,
    children: [],
    header: '',
    location: '/register',
  },
  {
    path: 'chat',
    element: <Chat />,
    children: [],
    header: '',
    location: '/chat',
  },
  {
    path: 'setavtar',
    element: <SetAvtar />,
    children: [],
    header: '',
    location: '/setavtar',
  },
];

export const toastService = {
  success: (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  },
  error: (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  },
};
