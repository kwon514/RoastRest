import { Navbar } from 'components';
import { isLoggedIn } from 'helpers';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';

function Account() {
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn().then((res) => {
      if (!res) {
        navigate('/login');
      }
    });
  }, [navigate]);

  const handleAccountUpdate = () => {
    return;
  };

  return (
    <>
      <Helmet>
        <title>Account | RoastRest</title>
      </Helmet>
      <Navbar showLogoutButton={true} />
      <div className="max-w-screen-lg mx-auto px-3 mb-24">
        <h2 className="text-4xl text-rr-brown-primary font-bold text-center py-8">Your Account</h2>
        <Box className="bg-white p-4 rounded-md">
          <h3 className="text-xl font-bold pb-2">Account Details</h3>
          <TextField
            id="name"
            name="name"
            label="Name"
            defaultValue="John"
            margin="dense"
            fullWidth
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            defaultValue="john@doe.com"
            margin="dense"
            fullWidth
          />
          <Button onClick={handleAccountUpdate} color="primary" sx={{ mt: 1 }}>
            Update Account
          </Button>
        </Box>
      </div>
    </>
  );
}

export default Account;
