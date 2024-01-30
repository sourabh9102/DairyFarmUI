import React, { useEffect, useState } from 'react';
import './LoginForm.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setTempToken } from '../Counter/userDetailsSlice';
import EmailVerify from '../EmailVerify/EmailVerify';



const Login = () => {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  axios.defaults.withCredentials = true;

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted with values:", values);
    axios.post("http://localhost:5001/auth/login", values)
      .then(res => {
        if (res.data.Login) {
          console.log("Response from backend:", res.data.temp_token);
          localStorage.setItem('tempToken_local', res.data.temp_token);
          dispatch(setTempToken(res.data.temp_token));
          navigate('/emailverify');
        } else {
          alert("Login failed");
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          alert("Invalid email or password.");
        } else {
          console.log("Error:", err);
        }
      });
  }


  return (
    <>
      <div className='fixed inset-0 flex justify-center items-center h-screen overflow-hidden pt-14'>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 mb-6 group">
            <input
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleInput}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>

          <div className="relative z-0 w-96 mb-10 group">
            <input
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleInput}
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div className='flex flex-col'>
            <div className='mb-4'>
              <Link
                to="/emailConfirm"
                className="float-left px-0 py-2 font-bold text-blue-600 rounded-md hover:bg-gray-100"
              >
                Forgot password?
              </Link>
              <button
                type="submit"
                className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-4 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Login
              </button>
            </div>
          </div>
          <p>
            Don't have an account?
            <Link
              to={'/registration'}
              className='ml-3 px-1 py-2 rounded-md font-bold hover:bg-gray-100 text-blue-600'
            >
              Sign up &rarr;
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;

