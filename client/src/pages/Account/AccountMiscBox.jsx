import { Box, Button } from '@mui/material';

function AccountMiscBox() {
  const handleAccountDeletion = () => {
    return;
  };

  return (
    <Box className="bg-white p-4 rounded-md mt-4">
      <h3 className="text-xl font-bold pb-2">Danger Zone</h3>
      <Button onClick={handleAccountDeletion} color="primary" sx={{ mt: 1 }}>
        Delete Account
      </Button>
    </Box>
  );
}

export default AccountMiscBox;
