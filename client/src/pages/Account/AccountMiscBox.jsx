import { Paper, Button } from '@mui/material';

function AccountMiscBox() {
  const handleAccountDeletion = () => {
    return;
  };

  return (
    <Paper className="bg-white p-5 mt-4">
      <h3 className="text-xl font-bold pb-2">Danger zone</h3>
      <Button onClick={handleAccountDeletion} variant="contained" color="error" sx={{ mt: 2 }}>
        Delete account
      </Button>
    </Paper>
  );
}

export default AccountMiscBox;
