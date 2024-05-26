import { useNavigate } from 'react-router-dom';
import { Paper, Button } from '@mui/material';
import { toastMessage, deleteAccount } from 'helpers';

function AccountMiscBox() {
  const navigate = useNavigate();

  const handleAccountDeletion = () => {
    deleteAccount().then((res) => {
      if (res.data.success) {
        navigate('/login', { state: { showToast: true, toastMessage: res.data.message } });
      } else {
        toastMessage('error', res.message);
      }
    });
  };

  return (
    <Paper className="bg-white p-5 mt-4">
      <h3 className="text-xl font-bold pb-2">Danger zone</h3>
      <Button onClick={handleAccountDeletion} variant="contained" color="error" sx={{ mt: 2 }}>
        Delete account
      </Button>
    </Paper>
  );
}

export default AccountMiscBox;
