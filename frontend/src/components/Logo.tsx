import React from 'react';

interface LogoProps {
  className?: string;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8", alt = "Luni Logo" }) => {
  return (
    <>
      {/* Light mode logo */}
      <img 
        src="/luniLightMode.png" 
        alt={alt} 
        className={`${className} dark:hidden`} 
      />
      {/* Dark mode logo */}
      <img 
        src="/luniDarkMode.png" 
        alt={alt} 
        className={`${className} hidden dark:block`} 
      />
    </>
  );
};

export default Logo;
