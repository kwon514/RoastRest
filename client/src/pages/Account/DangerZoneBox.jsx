import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { toastMessage, deleteAccount } from 'helpers';

function DangerZoneBox() {
  const navigate = useNavigate();
  const [deleteDialog, setDeleteDialog] = useState(false);

  const toggleDeleteDialog = (event, reason) => {
    setDeleteDialog(!deleteDialog);
  };

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
    <>
      <Paper className="bg-white p-5 my-4">
        <h3 className="text-xl font-semibold pb-2">Danger zone</h3>
        <Button
          onClick={toggleDeleteDialog}
          variant="contained"
          color="error"
          sx={{ mt: 2, textTransform: 'none' }}
        >
          Delete account
        </Button>
      </Paper>
      <Dialog open={deleteDialog} onClose={toggleDeleteDialog}>
        <DialogTitle>Delete account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAccountDeletion} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DangerZoneBox;
