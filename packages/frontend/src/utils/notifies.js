import { toast } from 'react-toastify';

export const notifyError = (error) => {
  toast.error(error, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'light',
  });
};


