import React from 'react';

const Button = ({ children, className = "", type = "button", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-[#622ad8] to-[#a8258e] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;