import React, { useState } from 'react'
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MyHeader from "./Header";
import MyFooter from "./Footer";

export default function UserName() {

  const [loginemail, setloginEmail] = useState('');
  const [loginpassword, setloginPassword] = useState('');
  const [redirect, setRedirect] = useState('');


  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_URI_LOGIN}`, {
        loginemail,
        loginpassword
      });
      if (response.status === 201) {
        console.log(response.data);
        localStorage.setItem("token", "barear " + response.data.token);
        toast.success("Logged in successfully", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setRedirect(true);
      } else if (response.status === 200 || response.status === 202) {
        toast.error('Wrong email or password', {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      else {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  if (redirect) {
    return <Navigate to="/profile" />;
  }



  return (
    <div>
      <MyHeader></MyHeader>
      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Company Logo" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="loginemail" name="loginemail" type="email" value={loginemail} onChange={(e) => setloginEmail(e.target.value)} autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" aria-required />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              </div>
              <div className="mt-2">
                <input id="loginpassword" name="loginpassword" type="password" value={loginpassword} onChange={(e) => { setloginPassword(e.target.value) }} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit" onClick={handleSignin} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
              <ToastContainer />
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Not a member?
            <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign Up here</a>
          </p>
          <p className="mt-6 text-center text-sm text-gray-500">
            Forgot Password?
            <a href="/reset" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Click here to recover</a>
          </p>
        </div>
      </div>
      <MyFooter></MyFooter>
    </div>
  )
}