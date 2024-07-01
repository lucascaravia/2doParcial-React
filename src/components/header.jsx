import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold flex items-center space-x-1">
          
          <Link to="/" className="hover:text-gray-500 transition duration-200 ease-in-out"><FaHome className="flex flex-row items-center h-10 w-10 text-3xl" /></Link>
        </div>
        <nav>
          <ul className="flex space-x-6 text-base">
            <li className="flex items-center space-x-1">
              <Link to="/products" className="hover:text-gray-500 transition duration-200 ease-in-out">Productos</Link>
            </li>
            <li className="flex items-center space-x-1">
          
              <Link to="/Aboutus" className="hover:text-gray-500 transition duration-200 ease-in-out">Sobre Nosotros</Link>
            </li>   
            <li className="flex items-center space-x-1">
              <Link to="/singup" className="hover:text-gray-500 transition duration-200 ease-in-out">Sign Up</Link>
            </li>
            <li className="flex items-center space-x-1">
              <Link to="/login" className="hover:text-gray-500 transition duration-200 ease-in-out">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
