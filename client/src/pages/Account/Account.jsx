import { Navbar, Sidebar } from 'components';
import { isLoggedIn, getUserData } from 'helpers';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import {
  PersonalDetailsBox,
  PersonalDetailsBoxSkeleton,
  PasswordUpdateBox,
  DirectDashboardBox,
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

  const getPersonalDetails = useCallback(() => {
    getUserData().then((res) => {
      if (res) {
        setUserName(res.data.name);
        setUserEmail(res.data.email);
        setIsLoadingData(false);
      }
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn()) {
      getPersonalDetails();
    } else {
      navigate('/login');
    }
  }, [getPersonalDetails, navigate]);

  return (
    <>
      <Helmet>
        <title>Account | RoastRest</title>
      </Helmet>
      <Navbar showNavMenu={true} />
      <Sidebar />
      <ThemeProvider theme={theme}>
        <div className="max-w-screen-lg mx-auto px-3 pt-12">
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
                  updateData={getPersonalDetails}
                />
              </>
            )}
            <PasswordUpdateBox updateData={getPersonalDetails} />
            <DirectDashboardBox />
            <DangerZoneBox />
          </div>
          <ToastContainer />
        </div>
      </ThemeProvider>
    </>
  );
}

export default Account;
