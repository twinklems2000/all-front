import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Home from '../pages/home/Home';
import Order from '../pages/order/Order';
import MainLayOut from '../pages/main-layout/MainLayOut';
import imgOne from '../assets/images/haseeb-jamil-J9lD6FS6_cs-unsplash.jpg';
import imgTwo from '../assets/images/iryna-marienko-o9JnbkBuFnc-unsplash.jpg';
import imgThree from '../assets/images/toa-heftiba-MSxw2vpQzx4-unsplash.jpg';
import { toast } from 'react-toastify';
import Authrole from '../components/app/Authrole';

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
    path: '/*',
    element: (
      <Authrole>
        <MainLayOut />
      </Authrole>
    ),
    children: [
      {
        path: 'home',
        element: <Home />,
        children: [],
        header: '',
        location: '/home',
      },
      {
        path: 'order',
        element: <Order />,
        children: [],
        header: '',
        location: '/order',
      },
    ],
    header: '',
  },
];

export const navbarData = [
  {
    title: 'Home',
    navigate: '/home',
  },
  {
    title: 'Order',
    navigate: '/order',
  },
];

export const bannerImgData = [
  {
    path: imgOne,
  },
  {
    path: imgTwo,
  },
  {
    path: imgThree,
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
