import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full bg-system-bg/80 backdrop-blur-lg z-50 border-b border-red-glow-soft/30 shadow-lg shadow-red-glow-subtle/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Logo className="h-8 w-8" alt="Luni Logo" />
            <span className="text-2xl font-bold bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">Luni</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#features" className="text-system-text-muted hover:text-system-accent transition-colors">
              Features
            </Link>
            <Link to="/#about" className="text-system-text-muted hover:text-system-accent transition-colors">
              About
            </Link>
            <Link to="/survey" className="text-system-text-muted hover:text-system-accent transition-colors">
              Take Survey
            </Link>
            <button className="bg-gradient-to-r from-system-accent to-system-accent-light text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Coming Soon
            </button>
          </div>
          <div className="md:hidden">
            <button className="text-system-text-muted hover:text-system-accent">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
