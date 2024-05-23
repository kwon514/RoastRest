import { updateAccountDetails } from 'helpers';
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

function AccountDetailsBox({ userName, userEmail, updateData }) {
  const [inputValue, setInputValue] = useState({
    name: userName,
    email: userEmail,
  });

  const { name, email } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleAccountUpdate = () => {
    updateAccountDetails(name, email).then((res) => {
      localStorage.setItem('name', name);
      updateData();
    });
  };

  return (
    <Box className="bg-white p-4 rounded-md">
      <h3 className="text-xl font-bold pb-2">Account Details</h3>
      <TextField
        id="name"
        name="name"
        label="Name"
        defaultValue={userName}
        onChange={handleOnChange}
        margin="dense"
        fullWidth
      />
      <TextField
        id="email"
        name="email"
        label="Email"
        defaultValue={userEmail}
        onChange={handleOnChange}
        margin="dense"
        fullWidth
      />
      <Button onClick={handleAccountUpdate} color="primary" sx={{ mt: 1 }}>
        Update Details
      </Button>
    </Box>
  );
}

export default AccountDetailsBox;
