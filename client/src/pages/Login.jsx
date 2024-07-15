import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import { Navbar, PasswordInputField } from 'components';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { isLoggedIn, loginUser, toastMessage } from 'helpers';
import { createTheme, ThemeProvider, Button, Paper, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#634832',
    },
    secondary: {
      main: '#553E2B',
    },
  },
});

const LoginButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 'normal',
  textTransform: 'none',
  padding: '10px 0',
  margin: '0.5rem 0',
  borderRadius: 4,
}));

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
    try {
      loginUser(email, password).then((res) => {
        const { message, success } = res.data;
        if (success) {
          localStorage.setItem('skipLanding', false);
          navigate('/dashboard', { state: { showToast: true, toastMessage: message } });
        } else {
          toastMessage('error', message);
        }
      });
    } catch (error) {
      console.log(error);
    }
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
      <ThemeProvider theme={theme}>
        <div className="max-w-screen-lg mx-auto px-3">
          <Paper className="mx-auto mt-20 bg-white p-5 sm:w-2/3">
            <h2 className="text-2xl font-bold pb-2">Welcome to RoastRest!</h2>
            <p className="text-md pb-2">Log back in and keep tracking of your coffee.</p>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                type="email"
                value={email}
                autoComplete="email"
                onChange={handleOnChange}
                margin="normal"
                fullWidth
              />
              <PasswordInputField
                id="password"
                name="password"
                label="Password"
                value={password}
                autoComplete="password"
                handleOnChange={handleOnChange}
                margin="normal"
              />
              <LoginButton type="submit" variant="contained" color="primary" fullWidth>
                Login
              </LoginButton>
              <p className="mt-2">
                Don't an account?{' '}
                <Link className="font-bold no-underline text-rr-brown-primary" to={'/signup'}>
                  Sign up
                </Link>
              </p>
            </form>
          </Paper>
          <ToastContainer />
        </div>
      </ThemeProvider>
    </>
  );
}

export default Login;
