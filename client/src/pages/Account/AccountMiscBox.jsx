import { Box, Button } from '@mui/material';

function AccountMiscBox() {
  const handleAccountDeletion = () => {
    return;
  };

  return (
    <Box className="bg-white p-5 rounded-md mt-4">
      <h3 className="text-xl font-bold pb-2">Danger zone</h3>
      <Button onClick={handleAccountDeletion} variant="contained" color="primary" sx={{ mt: 2 }}>
        Delete account
      </Button>
    </Box>
  );
}

export default AccountMiscBox;
