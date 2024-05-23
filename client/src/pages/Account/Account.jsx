import { Navbar } from 'components';
import { isLoggedIn } from 'helpers';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { createTheme, ThemeProvider, Box, TextField, Button } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#896345',
    },
    secondary: {
      main: '#f0eee7',
    },
  },
});

function Account() {
  const navigate = useNavigate();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [userName, setUserName] = useState('asdf');
  const [userEmail, setUserEmail] = useState('fdsa');

  const getUserData = useCallback(() => {
    isLoggedIn().then((res) => {
      if (res) {
        setUserName(res.name);
        setUserEmail(res.email);
        setIsLoadingData(false);
      }
    });
  }, []);

  useEffect(() => {
    isLoggedIn().then((res) => {
      if (res) {
        getUserData();
      } else {
        navigate('/login');
      }
    });
  }, [getUserData, navigate]);

  const handleAccountUpdate = () => {
    return;
  };

  const handlePasswordUpdate = () => {
    return;
  };

  const handleAccountDeletion = () => {
    return;
  };

  return (
    <>
      <Helmet>
        <title>Account | RoastRest</title>
      </Helmet>
      <Navbar showLogoutButton={true} />
      <ThemeProvider theme={theme}>
        <div className="max-w-screen-lg mx-auto px-3 mb-24">
          <h2 className="text-4xl text-rr-brown-primary font-bold text-center py-8">
            Your Account
          </h2>
          {isLoadingData ? (
            <div className="w-full flex justify-center items-center">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="md:w-3/4 mx-auto">
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
                  Update Account
                </Button>
              </Box>
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
              <Box className="bg-white p-4 rounded-md mt-4">
                <h3 className="text-xl font-bold pb-2">Danger Zone</h3>
                <Button onClick={handleAccountDeletion} color="primary" sx={{ mt: 1 }}>
                  Delete Account
                </Button>
              </Box>
            </div>
          )}
        </div>
      </ThemeProvider>
    </>
  );
}

export default Account;
