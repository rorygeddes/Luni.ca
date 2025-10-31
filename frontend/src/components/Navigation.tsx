import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-system-accent/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 md:h-32">
          <div className="flex items-center space-x-4">
            <Logo className="h-12 w-12 md:h-16 md:w-16" alt="Luni Logo" />
            <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">Luni</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/#features" className="text-gray-700 hover:text-system-accent transition-colors text-lg font-medium">
              Solutions
            </Link>
            <Link to="/why" className="text-gray-700 hover:text-system-accent transition-colors text-lg font-medium">
              Our Vision
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-system-accent transition-colors text-lg font-medium">
              Login
            </Link>
            <Link to="/survey" className="bg-gradient-to-r from-system-accent to-system-accent-light text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-lg font-semibold">
              Join the Beta
            </Link>
          </div>
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-system-accent">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
