import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Navbar } from 'components';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toTitleCase } from 'helpers';

function Signup() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    name: '',
  });
  const { email, password, name } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const [visible, setVisible] = useState(false);

  const handleError = (err) =>
    toast.error(err, {
      position: 'bottom-left',
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/signup`,
        {
          ...inputValue,
          name: toTitleCase(inputValue.name),
        },
        { withCredentials: true }
      );
      const { name, success, message } = data;
      if (success) {
        localStorage.setItem('name', name);
        navigate('/dashboard');
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-screen-lg px-3 py-8">
        <div className="mx-auto max-w-screen-sm">
          <h2 className="text-4xl text-bc-2 font-bold text-center">Create your account</h2>
          <form className="my-5" onSubmit={handleSubmit}>
            <label className="font-bold" htmlFor="email">
              First Name
            </label>
            <div className="mb-5">
              <input
                className="w-full p-3 rounded border-2 border-bc-2"
                type="text"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={handleOnChange}
              />
            </div>
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <div className="mb-5">
              <input
                className="w-full p-3 rounded border-2 border-bc-2"
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
              <div className="flex w-full rounded bg-white border-bc-2 border-2 focus-within:border-black">
                <input
                  className="w-full p-3 border-none outline-none"
                  type={visible ? 'text' : 'password'}
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                  autoComplete="new-password"
                />
                <div className="p-3 cursor-pointer" onClick={() => setVisible(!visible)}>
                  {visible ? <Visibility /> : <VisibilityOff />}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-ba-1 hover:bg-ba-2 text-xl text-white p-3 rounded-md w-full mb-3"
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
