import { Box, Button, TextField } from '@mui/material';

function PasswordUpdateBox() {
  const handlePasswordUpdate = () => {
    return;
  };

  return (
    <Box className="bg-white p-4 rounded-md mt-4">
      <h3 className="text-xl font-bold pb-2">Update Password</h3>
      <TextField
        id="password"
        name="password"
        label="Current Password"
        defaultValue=""
        margin="dense"
        fullWidth
      />
      <TextField
        id="newPassword"
        name="newPassword"
        label="New Password"
        defaultValue=""
        margin="dense"
        fullWidth
      />
      <TextField
        id="confirmNewPassword"
        name="confirmNewPassword"
        label="Confirm New Password"
        defaultValue=""
        margin="dense"
        fullWidth
      />
      <Button onClick={handlePasswordUpdate} color="primary" sx={{ mt: 1 }}>
        Update Password
      </Button>
    </Box>
  );
}

export default PasswordUpdateBox;
