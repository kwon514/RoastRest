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
        <title>Account | RoastRest</title>
      </Helmet>
      <Navbar showLogoutButton={true} />
      <div className="max-w-screen-lg mx-auto px-3 mb-24">
        <h2 className="text-4xl text-rr-brown-primary font-bold text-center py-8">Your Account</h2>
      </div>
    </>
  );
}

export default Account;
