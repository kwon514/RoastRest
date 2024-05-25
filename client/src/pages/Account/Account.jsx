import { Navbar } from 'components';
import { isLoggedIn } from 'helpers';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { AccountSettings } from './';

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
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const getUserData = useCallback(() => {
    isLoggedIn().then((res) => {
      if (res) {
        setUserName(res.name);
        setUserEmail(res.email);
        setIsLoadingData(false);
      }
    });
  }, []);

  const handleToast = (type, message) => {
    if (type === 'success') {
      toast.success(message, { position: 'bottom-left' });
    } else if (type === 'error') {
      toast.error(message, { position: 'bottom-left' });
    } else {
      toast(message, { position: 'bottom-left' });
    }
  };

  useEffect(() => {
    isLoggedIn().then((res) => {
      if (res) {
        getUserData();
      } else {
        navigate('/login');
      }
    });
  }, [getUserData, navigate]);

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
            <AccountSettings
              userName={userName}
              userEmail={userEmail}
              updateData={getUserData}
              handleToast={handleToast}
            />
          )}
          <ToastContainer />
        </div>
      </ThemeProvider>
    </>
  );
}

export default Account;
