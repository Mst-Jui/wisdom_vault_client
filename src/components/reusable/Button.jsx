import React from 'react';

const Button = ({ children, className = "", type = "button", onClick }) => {
  return (
    <button
  type={type}
  onClick={onClick}
  className={`flex items-center justify-center gap-2 px-4 py-1.5 text-sm rounded-full font-semibold text-white bg-gradient-to-r from-[#622ad8] to-[#a8258e] md:px-5 md:py-2 md:text-base lg:px-6 lg:py-2.5 lg:text-lg ${className}`}
>
  {children}
</button>
  );
};

export default Button;