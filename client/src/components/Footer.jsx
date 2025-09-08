import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-6  border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="flex space-x-4 mb-3">
          <a href="https://github.com/anuj8918" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition duration-300">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/anuj-mishra-9ba5a2249/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition duration-300">
            <FaLinkedin size={24} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition duration-300">
            <FaTwitter size={24} />
          </a>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
        </p>
        <p className="text-xs mt-1 text-gray-400">
          Made with <span role="img" aria-label="heart">💙</span> by Anuj.
        </p>
      </div>
    </footer>
  );
};

export default Footer;