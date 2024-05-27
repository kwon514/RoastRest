import { Navbar } from 'components';
import { isLoggedIn } from 'helpers';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import {
  PersonalDetailsBox,
  PersonalDetailsBoxSkeleton,
  PasswordUpdateBox,
  DangerZoneBox,
} from './';

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
      <Navbar showNavMenu={true} />
      <ThemeProvider theme={theme}>
        <div className="max-w-screen-lg mx-auto px-3 mb-24">
          <h2 className="text-4xl text-rr-brown-primary font-bold text-center py-8">
            Your Account
          </h2>
          <div className="md:w-3/4 mx-auto">
            {isLoadingData ? (
              <>
                <PersonalDetailsBoxSkeleton />
              </>
            ) : (
              <>
                <PersonalDetailsBox
                  userName={userName}
                  userEmail={userEmail}
                  updateData={getUserData}
                />
              </>
            )}
            <PasswordUpdateBox updateData={getUserData} />
            <DangerZoneBox />
          </div>
          <ToastContainer />
        </div>
      </ThemeProvider>
    </>
  );
}

export default Account;
