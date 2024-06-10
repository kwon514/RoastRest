import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import { Navbar, PasswordInputField } from 'components';
import { registerUser, toastMessage } from 'helpers';
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

const SignupButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 'normal',
  textTransform: 'none',
  padding: '10px 0',
  margin: '0.5rem 0',
  borderRadius: 4,
}));

function Signup() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toastMessage('error', 'Passwords do not match!');
      return;
    }
    try {
      registerUser(email, password, name).then((res) => {
        const { message, success } = res.data;
        if (success) {
          navigate('/dashboard', { state: { showToast: true, toastMessage: message } });
        } else {
          toastMessage('error', message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | RoastRest</title>
      </Helmet>
      <Navbar />
      <ThemeProvider theme={theme}>
        <div className="max-w-screen-lg mx-auto px-3">
          <Paper className="mx-auto mt-20 bg-white p-5 sm:w-2/3">
            <h2 className="text-2xl font-bold pb-2">Welcome to RoastRest!</h2>
            <p className="text-md pb-2">Create an account and keep track of your coffee.</p>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                value={name}
                autoComplete="given-name"
                onChange={handleOnChange}
                margin="normal"
                fullWidth
              />
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
              <PasswordInputField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                value={confirmPassword}
                autoComplete="new-password"
                handleOnChange={handleOnChange}
                margin="normal"
              />
              <SignupButton type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
              </SignupButton>
              <p className="mt-2">
                Already have an account?{' '}
                <Link className="font-bold no-underline text-rr-brown-primary" to={'/login'}>
                  Sign in
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

export default Signup;
