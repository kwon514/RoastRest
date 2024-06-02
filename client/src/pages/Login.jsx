import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import { Navbar } from 'components';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { isLoggedIn, loginUser, toastMessage } from 'helpers';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(email, password).then((res) => {
      const { name, message, success } = res.data;
      if (success) {
        localStorage.setItem('skipLanding', false);
        navigate('/dashboard', { state: { showToast: true, toastMessage: message } });
      } else {
        toastMessage('error', message);
      }
    });
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/dashboard');
    }
    if (location.state?.showToast) {
      toastMessage('success', location.state.toastMessage);
      window.history.replaceState({}, '');
    }
  }, [navigate, location.state]);

  return (
    <>
      <Helmet>
        <title>Login | RoastRest</title>
      </Helmet>
      <Navbar />
      <div className="mx-auto max-w-screen-lg px-3 py-8">
        <div className="mx-auto max-w-screen-sm">
          <h2 className="text-4xl text-rr-brown-primary font-bold text-center">Login</h2>
          <form className="my-5" onSubmit={handleSubmit}>
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <div className="mb-5">
              <input
                className="w-full p-3 rounded border-2 border-rr-brown-buttons"
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
              />
            </div>
            <label className="font-bold" htmlFor="password">
              Password
            </label>
            <div className="flex justify-between items-center mb-5">
              <div className="flex w-full rounded bg-white border-rr-brown-buttons border-2 focus-within:border-black">
                <input
                  className="w-full p-3 border-none outline-none"
                  type={visible ? 'text' : 'password'}
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                />
                <div className="p-3 cursor-pointer" onClick={() => setVisible(!visible)}>
                  {visible ? <Visibility /> : <VisibilityOff />}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-rr-brown-buttons hover:bg-rr-brown-hover text-xl text-white p-3 rounded-md w-full mb-3"
            >
              Submit
            </button>
            <p>
              Don't have an account?{' '}
              <Link className="underline" to={'/signup'}>
                Sign up
              </Link>
            </p>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Login;
