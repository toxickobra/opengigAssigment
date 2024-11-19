// src/components/ui/alert.jsx
import React from 'react';

export const Alert = ({ children, className }) => {
  return <div className={`p-4 rounded-lg ${className}`}>{children}</div>;
};

export const AlertTitle = ({ children }) => {
  return <strong className="text-lg font-semibold">{children}</strong>;
};

export const AlertDescription = ({ children, className }) => {
    return <div className={`mt-2 ${className}`}>{children}</div>;
  };
  