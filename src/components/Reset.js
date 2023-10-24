import React, { useState } from 'react'
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MyHeader from "./Header";
import MyFooter from "./Footer";

export default function Reset() {

  const [forgotemail, setForgotemail] = useState('');
  const [redirect, setRedirect] = useState('');

  const ForgotPass = async (e) => {
    e.preventDefault();
    try {
      const approverequest = await axios.post(`${process.env.REACT_APP_URI_FPASS}`, {
        forgotemail
      });
      console.log(approverequest.data);
      if (approverequest.data.status === "User Not Exists!!") {
        toast.error("Dude don't fuck with us! First register yourself", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (approverequest.data.status === "Email Sent"){
        toast.success("Email with password re-setting link has been sent to your mail", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setRedirect(true);
        console.log(approverequest.data.status);
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <MyHeader></MyHeader>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Enter your email, rest we will take care</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input id="email" value={forgotemail} onChange={(e) => setForgotemail(e.target.value)} name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                  </div>
                  <div className="relative">
                    <button onClick={ForgotPass} className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                    <ToastContainer />
                  </div>
                  <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign Up here</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MyFooter></MyFooter>
    </div>
  )
}
