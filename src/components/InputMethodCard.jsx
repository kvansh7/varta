// src/components/InputMethodCard.jsx
import React from 'react';

const InputMethodCard = ({ title, description, onClick }) => {
  return (
    <div
      className="border border-lightText p-4 rounded shadow-lg hover:bg-secondaryBg cursor-pointer transition-all duration-200"
      onClick={onClick}
    >
      <h3 className="text-xl font-bold text-lightText mb-2">{title}</h3>
      <p className="text-lightText">{description}</p>
    </div>
  );
};

export default InputMethodCard;
