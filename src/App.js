import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import all components
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Profile from './components/Profile';
import Reset from './components/Reset';
import Register from './components/Register';
import OtpVerification from './components/OtpVerification';
import Home from './components/Home';

// Private Route
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token');
  if (!isLoggedIn) {
    return <Navigate to='/login' />
  }
  return children;
};

// Route Routes
const router = createBrowserRouter([
  {
    path: '/signup',
    element: <Register></Register>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/pagenotfound',
    element: <PageNotFound></PageNotFound>
  },
  {
    path: '/profile',
    element: <PrivateRoute><Profile /></PrivateRoute>
  },
  {
    path: '/reset',
    element: <Reset></Reset>
  },
  {
    path: '/otpverify',
    element: <OtpVerification></OtpVerification>
  },
  {
    path: '/',
    element: <Home></Home>
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>
  }
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer/>
    </main>

  )
}
