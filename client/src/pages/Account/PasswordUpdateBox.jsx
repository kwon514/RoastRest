import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { updatePassword } from 'helpers';

function PasswordUpdateBox({ updateData, handleToast }) {
  const [inputValue, setInputValue] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const { currentPassword, newPassword, confirmNewPassword } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      handleToast('Passwords do not match!');
      return;
    }

    try {
      updatePassword(currentPassword, newPassword).then((res) => {
        updateData();
        if (res.data.success) {
          handleToast(res.data.message);
        } else {
          handleToast(res.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="bg-white p-4 rounded-md mt-4">
      <h3 className="text-xl font-bold pb-2">Change your password</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          id="currentPassword"
          name="currentPassword"
          label="Current password"
          type="password"
          onChange={handleOnChange}
          margin="dense"
          fullWidth
        />
        <TextField
          id="newPassword"
          name="newPassword"
          label="New password"
          type="password"
          onChange={handleOnChange}
          margin="dense"
          fullWidth
        />
        <TextField
          id="confirmNewPassword"
          name="confirmNewPassword"
          label="Confirm new password"
          type="password"
          onChange={handleOnChange}
          margin="dense"
          fullWidth
        />
        <Button type="submit" color="primary" sx={{ mt: 1 }}>
          Update password
        </Button>
      </form>
    </Box>
  );
}

export default PasswordUpdateBox;
