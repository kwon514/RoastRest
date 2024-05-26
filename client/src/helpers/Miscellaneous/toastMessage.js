import { toast } from 'react-toastify';

function toastMessage(type, message) {
  const toastConfig = { position: 'bottom-left', autoClose: 1500, hideProgressBar: true };
  if (type === 'success') {
    toast.success(message, toastConfig);
  } else if (type === 'error') {
    toast.error(message, toastConfig);
  } else {
    toast(message, toastConfig);
  }
}

export default toastMessage;
