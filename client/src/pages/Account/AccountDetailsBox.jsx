import { Box, Button, TextField } from '@mui/material';

const handleAccountUpdate = () => {
  return;
};

function AccountDetailsBox({ userName, userEmail }) {
  return (
    <Box className="bg-white p-4 rounded-md">
      <h3 className="text-xl font-bold pb-2">Account Details</h3>
      <TextField
        id="name"
        name="name"
        label="Name"
        defaultValue={userName}
        margin="dense"
        fullWidth
      />
      <TextField
        id="email"
        name="email"
        label="Email"
        defaultValue={userEmail}
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
