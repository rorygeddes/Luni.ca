import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-system-bg text-system-text py-12 px-4 sm:px-6 lg:px-8 border-t border-system-accent/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Logo className="h-8 w-8" alt="Luni Logo" />
            <span className="text-2xl font-bold">Luni</span>
          </div>
          <div className="flex space-x-6">
            <a href="https://twitter.com/luni_app" target="_blank" rel="noopener noreferrer" className="text-system-text-muted hover:text-system-accent transition-colors">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="https://instagram.com/luni.students" target="_blank" rel="noopener noreferrer" className="text-system-text-muted hover:text-system-accent transition-colors">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/rory-geddes/" target="_blank" rel="noopener noreferrer" className="text-system-text-muted hover:text-system-accent transition-colors">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
        <div className="border-t border-system-accent/30 mt-8 pt-8 text-center text-system-text-muted">
          <p>&copy; 2024 Luni. All rights reserved. Coming soon to help students manage their money better.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
