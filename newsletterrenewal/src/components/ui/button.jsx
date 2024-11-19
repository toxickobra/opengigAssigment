// src/components/ui/button.jsx
import React from 'react';

export const Button = ({ children, onClick, className, variant = 'solid' }) => {
  const baseStyles = 'px-4 py-2 rounded text-white focus:outline-none';
  const variantStyles = {
    solid: 'bg-blue-600 hover:bg-blue-700',
    outline: 'bg-transparent border-2 border-blue-600 hover:bg-blue-600 hover:text-white',
    danger: 'bg-red-600 hover:bg-red-700',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

