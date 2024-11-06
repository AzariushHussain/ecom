// src/components/FloatingMessage.js

import React, { useEffect } from 'react';

const FloatingMessage = ({ type, text, onClose }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-md ${getTypeStyles()} flex justify-between items-center z-50`}>
      <span>{text}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-sm text-gray-500 hover:text-gray-700">
          &times;
        </button>
      )}
    </div>
  );
};

export default FloatingMessage;
