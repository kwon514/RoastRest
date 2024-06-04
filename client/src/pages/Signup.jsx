import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import { Navbar, PasswordInputField } from 'components';
import { registerUser, toastMessage } from 'helpers';
import { TextField } from '@mui/material';

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
      <div className="mx-auto max-w-screen-lg px-3 py-8">
        <div className="mx-auto max-w-screen-sm">
          <h2 className="text-4xl text-rr-brown-primary font-bold text-center">
            Create your account
          </h2>
          <form className="my-5" onSubmit={handleSubmit}>
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
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Signup;
