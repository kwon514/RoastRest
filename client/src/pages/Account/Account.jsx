import { Navbar } from 'components';
import { isLoggedIn } from 'helpers';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function Account() {
  const navigate = useNavigate();

  if (!isLoggedIn()) {
    navigate('/');
  }

  return (
    <>
      <Helmet>
        <title>Account</title>
      </Helmet>
      <Navbar showLogoutButton={true} />
    </>
  );
}

export default Account;
