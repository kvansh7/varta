// src/components/TranslationResult.jsx
import React from 'react';

const TranslationResult = ({ result }) => {
  return (
    <div className="border border-lightText p-4 mt-4 bg-secondaryBg text-lightText w-full">
      <h2 className="text-xl font-bold mb-2">Translation Result</h2>
      <p>{result}</p>
      <div className="mt-4 flex space-x-2">
        <button className="bg-buttonColor text-white py-1 px-4 rounded hover:bg-accent">Download</button>
        <button className="bg-secondaryBg text-lightText border border-lightText py-1 px-4 rounded hover:bg-accent">Copy</button>
        <button className="bg-accent text-white py-1 px-4 rounded hover:bg-buttonColor">Save to History</button>
      </div>
    </div>
  );
};

export default TranslationResult;
