// src/components/ui/card.jsx
import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => (
  <div className="border-b pb-4 mb-4">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold text-gray-800">{children}</h2>
);

const CardContent = ({ children }) => <div>{children}</div>;

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;

export default Card;
