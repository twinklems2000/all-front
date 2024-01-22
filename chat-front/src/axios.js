import axios from 'axios';
import { toastService } from './constants/data';

axios.interceptors.request.use(
  function (config) {
    console.log('config', config);
    return config;
  },
  function (error) {
    // Do something with request error
    console.log('error>>>>>>', error);
    toastService.error(error.message);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log('response', response);
    if (response.status !== 200) {
      toastService.error(response.data);
    }
    return response;
  },
  function (error) {
    toastService.error(error.message);
    return Promise.reject(error);
  }
);
