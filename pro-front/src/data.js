import { toast } from 'react-toastify';

export const toastService = {
  success: (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  },
};
