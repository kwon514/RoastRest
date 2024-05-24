import { updateAccountDetails } from 'helpers';
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

function AccountDetailsBox({ userName, userEmail, updateData, handleToast }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateAccountDetails(name, email).then((res) => {
        localStorage.setItem('name', name);
        updateData();
        handleToast(res.data.message);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="bg-white p-4 rounded-md">
      <h3 className="text-xl font-bold pb-2">Account details</h3>
      <form onSubmit={handleSubmit}>
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
          type="email"
          defaultValue={userEmail}
          onChange={handleOnChange}
          margin="dense"
          fullWidth
        />
        <Button type="submit" color="primary" sx={{ mt: 1 }}>
          Update details
        </Button>
      </form>
    </Box>
  );
}

export default AccountDetailsBox;
