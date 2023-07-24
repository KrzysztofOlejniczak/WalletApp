import { toast } from 'react-toastify';

export const NotifyError = ({ error }) => {
    console.log('urhccfs');
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
