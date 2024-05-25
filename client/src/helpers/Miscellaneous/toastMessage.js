import { toast } from 'react-toastify';

function toastMessage(type, message) {
  if (type === 'success') {
    toast.success(message, { position: 'bottom-left' });
  } else if (type === 'error') {
    toast.error(message, { position: 'bottom-left' });
  } else {
    toast(message, { position: 'bottom-left' });
  }
}

export default toastMessage;
