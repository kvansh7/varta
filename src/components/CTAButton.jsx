// src/components/CTAButton.jsx
import React from 'react';

const CTAButton = ({ text, onClick }) => {
  return (
    <button
      className="bg-buttonColor hover:bg-accent text-white font-bold py-2 px-4 rounded transition-all duration-200"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CTAButton;
