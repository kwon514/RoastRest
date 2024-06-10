import { toastMessage, updatePersonalDetails } from 'helpers';
import { useState } from 'react';
import { Paper, Button, TextField } from '@mui/material';

function PersonalDetailsBox({ userName, userEmail, updateData }) {
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
      updatePersonalDetails(name, email).then((res) => {
        updateData();
        if (res.data.success) {
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
    <Paper className="bg-white p-5">
      <h3 className="text-xl font-bold pb-2">Personal details</h3>
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, textTransform: 'none' }}
        >
          Update details
        </Button>
      </form>
    </Paper>
  );
}

export default PersonalDetailsBox;
