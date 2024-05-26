import { useState } from 'react';
import { Paper, Button } from '@mui/material';
import { toastMessage, updatePassword } from 'helpers';
import { PasswordInputField } from './';

function PasswordUpdateBox({ updateData }) {
  const [inputValue, setInputValue] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const { currentPassword, newPassword, confirmNewPassword } = inputValue;

  const clearInputs = () => {
    setInputValue({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  };

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
      toastMessage('error', 'Passwords do not match!');
      return;
    }
    try {
      updatePassword(currentPassword, newPassword).then((res) => {
        updateData();
        if (res.data.success) {
          clearInputs();
          toastMessage('success', res.data.message);
        } else {
          toastMessage('error', res.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper className="bg-white p-5 mt-4">
      <h3 className="text-xl font-bold pb-2">Change your password</h3>
      <form onSubmit={handleSubmit}>
        <PasswordInputField
          id="currentPassword"
          name="currentPassword"
          label="Current password"
          value={currentPassword}
          handleOnChange={handleOnChange}
        />
        <PasswordInputField
          id="newPassword"
          name="newPassword"
          label="New password"
          value={newPassword}
          handleOnChange={handleOnChange}
        />
        <PasswordInputField
          id="confirmNewPassword"
          name="confirmNewPassword"
          label="Confirm new password"
          value={confirmNewPassword}
          handleOnChange={handleOnChange}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Update password
        </Button>
      </form>
    </Paper>
  );
}

export default PasswordUpdateBox;
