import { Navbar, Sidebar } from 'components';
import { isLoggedIn, getUserData } from 'helpers';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  PersonalDetailsBox,
  PersonalDetailsBoxSkeleton,
  PasswordUpdateBox,
  DirectDashboardBox,
  DangerZoneBox,
} from './';

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
      <div className="mx-auto w- pl-72 pr-8 pt-12">
        <div className="sm:w-12/12 xl:w-10/12 2xl:w-6/12 max-w-screen-lg mx-auto">
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
    </>
  );
}

export default Account;
