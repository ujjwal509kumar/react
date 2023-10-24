import React from 'react';
import logo from './images/logo.jpg';
import { useState } from 'react';
import { RiAccountCircleLine } from 'react-icons/ri';


function Header() {
  const token = localStorage.getItem('token');
  const [drop, setdrop] = useState(false)
  const toggleDropDown = () => {
    setdrop(!drop);
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2">
      <div className="logo mx-5">
        <img src={logo} width={100} height={40} alt="logo" />
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-2 font-bold md:text-xl">
          <a href="/"><li>About Us</li></a>
          <a href="/"><li>Services</li></a>
          <a href="/"><li>Our team</li></a>
          <a href="/"><li>Contact Us</li></a>
        </ul>
      </div>
      {drop && <div className='absolute right-3 top-12 rounded-md px-5 bg-blue-400'>
        <ul>
          <li className='py-2 hover:text-blue-200 text-sm'>My Account</li>
          <li className='py-2 hover:text-blue-200 text-sm'>Logout</li>
        </ul>
      </div>}
      {token ? ( // If a token is available, show the profile
        <div className="account absolute right-0 top-4 mx-5">
          <RiAccountCircleLine onMouseOver={toggleDropDown} onMouseLeave={toggleDropDown} size={30} className="text-xl md:3xl" />
        </div>
      ) : ( // If a token is not available, show the button
        <div className="absolute right-0 top-4 mx-5">
          <a href='/login'><button className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0 text-white">
            Button
          </button></a>
        </div>
      )}
    </div>
  );
}

export default Header;
