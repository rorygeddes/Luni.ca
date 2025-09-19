import React from 'react';

interface LogoProps {
  className?: string;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8", alt = "Luni Logo" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Light mode logo */}
      <img 
        src="/luniLightMode.png" 
        alt={alt} 
        className={`absolute inset-0 w-full h-full object-contain dark:opacity-0 dark:pointer-events-none transition-opacity duration-0`} 
      />
      {/* Dark mode logo */}
      <img 
        src="/luniDarkMode.png" 
        alt={alt} 
        className={`absolute inset-0 w-full h-full object-contain opacity-0 dark:opacity-100 dark:pointer-events-auto transition-opacity duration-0`} 
      />
    </div>
  );
};

export default Logo;
