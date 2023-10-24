import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MyHeader from './Header';
import MyFooter from './Footer';


export default function Profile() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: token
        };
        const response = await axios.get('http://localhost:5000/user', { headers });
        const { email, name } = response.data;
        setEmail(email);
        setName(name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    toast.info('Logged out successfully', {
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
  };
  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    // <div>
    //   <h1>{email}</h1>
    //   <h1>{name}</h1>
    //   <button type="button" onClick={logout} classNameName="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Logout</button>
    //   <ToastContainer />
    // </div>
    <div>
      <MyHeader></MyHeader>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img src="https://source.unsplash.com/collection/944309/720x600" className="object-cover object-center rounded" alt="hero" />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Name : {name}
            </h1>
            <p className="mb-8 leading-relaxed">Email : {email}</p>
            <div className="flex justify-center">
              <button onClick={logout} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Logout</button>
              {/* <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button> */}
              <ToastContainer />
            </div>
          </div>
        </div>
      </section>
      <MyFooter></MyFooter>
    </div>
  );
}


