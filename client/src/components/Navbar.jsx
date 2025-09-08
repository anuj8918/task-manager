import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    logout();
    navigate('/login');
  };

  return (
    <header className="p-4 sm:p-5 bg-white shadow-md flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-xl sm:text-3xl font-extrabold text-blue-600 tracking-wide">Task Manager</h1>
      <div className="flex items-center space-x-2 sm:space-x-4">
        {user ? (
          <>
            <span className="text-sm sm:text-lg font-medium text-gray-700 hidden md:inline">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 sm:px-5 sm:py-2 font-semibold text-sm sm:text-base text-white bg-red-500 rounded-full hover:bg-red-600 transition duration-300 shadow-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 sm:px-5 sm:py-2 font-semibold text-sm sm:text-base text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hidden sm:inline-block px-3 py-1 sm:px-5 sm:py-2 font-semibold text-sm sm:text-base text-blue-600 bg-transparent border-2 border-blue-600 rounded-full hover:bg-blue-100 transition duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;