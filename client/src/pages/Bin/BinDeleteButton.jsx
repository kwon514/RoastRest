import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { deleteAllBinnedCoffeeData } from 'helpers';

function BinDeleteButton({ updateData, toastMsg }) {
  const [deleteDialog, setDeleteDialog] = useState(false);

  const toggleDeleteDialog = (event, reason) => {
    setDeleteDialog(!deleteDialog);
  };

  const handleBinDeletion = () => {
    deleteAllBinnedCoffeeData().then(() => {
      setDeleteDialog(false);
      updateData();
      toastMsg(`Bin has been emptied successfully`);
    });
  };

  return (
    <>
      <Button onClick={toggleDeleteDialog} variant="contained" color="primary" sx={{ mb: 2 }}>
        Empty bin
      </Button>
      <Dialog open={deleteDialog} onClose={toggleDeleteDialog}>
        <DialogTitle>Empty bin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to empty the bin? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBinDeletion} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BinDeleteButton;
