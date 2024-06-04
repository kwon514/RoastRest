import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import { Navbar, PasswordInputField } from 'components';
import { registerUser, toastMessage } from 'helpers';
import { Paper, TextField } from '@mui/material';

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
      <div className="max-w-screen-lg mx-auto px-3">
        <h2 className="text-4xl text-rr-brown-primary font-bold text-center py-8">
          Create your account
        </h2>
        <Paper className="mx-auto bg-white p-5 sm:w-2/3">
          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              name="name"
              label="Name"
              value={name}
              onChange={handleOnChange}
              margin="normal"
              fullWidth
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={email}
              onChange={handleOnChange}
              margin="normal"
              fullWidth
            />
            <PasswordInputField
              id="password"
              name="password"
              label="Password"
              value={password}
              handleOnChange={handleOnChange}
              margin="normal"
            />
            <PasswordInputField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              value={confirmPassword}
              handleOnChange={handleOnChange}
              margin="normal"
            />
            <button
              type="submit"
              className="bg-rr-brown-buttons hover:bg-rr-brown-hover text-xl text-white p-3 rounded-md w-full mb-3"
            >
              Submit
            </button>
            <p>
              Already have an account?{' '}
              <Link className="underline" to={'/login'}>
                Login
              </Link>
            </p>
          </form>
        </Paper>
        <ToastContainer />
      </div>
    </>
  );
}

export default Signup;
