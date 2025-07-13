import { useState } from 'react';
import {
  Fab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import BinIcon from '@mui/icons-material/DeleteForever';
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
      <Fab color="primary" aria-label="add" onClick={toggleDeleteDialog}>
        <BinIcon color="secondary" />
      </Fab>
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
