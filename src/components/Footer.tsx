import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-luni-gold/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img src="/logo192.png" alt="Luni Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold">Luni</span>
          </div>
          <div className="flex space-x-6">
            <a href="https://instagram.com/luni.students" className="text-gray-400 hover:text-luni-gold transition-colors" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/rory-geddes/" className="text-gray-400 hover:text-luni-gold transition-colors" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
        <div className="border-t border-luni-gold/30 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Luni. All rights reserved. Coming soon to help students manage their money better.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
