import { Box, Button } from '@mui/material';
import { AccountDetailsBox, PasswordUpdateBox } from './';

function AccountSettings({ userName, userEmail }) {
  const handleAccountDeletion = () => {
    return;
  };

  return (
    <div className="md:w-3/4 mx-auto">
      <AccountDetailsBox userName={userName} userEmail={userEmail} />
      <PasswordUpdateBox userName={userName} userEmail={userEmail} />
      <Box className="bg-white p-4 rounded-md mt-4">
        <h3 className="text-xl font-bold pb-2">Danger Zone</h3>
        <Button onClick={handleAccountDeletion} color="primary" sx={{ mt: 1 }}>
          Delete Account
        </Button>
      </Box>
    </div>
  );
}

export default AccountSettings;
