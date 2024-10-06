// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import InputMethodCard from '../components/InputMethodCard';
import TranslationResult from '../components/TranslationResult';

const Dashboard = () => {
  const [translation, setTranslation] = useState(null);

  const handleTranslate = (method) => {
    setTranslation(`Translated text from ${method}`);
  };

  return (
    <div className="p-6 bg-primaryBg text-lightText min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Select Input Method</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InputMethodCard title="Text" description="Translate text input." onClick={() => handleTranslate('Text')} />
        <InputMethodCard title="Speech" description="Translate speech input." onClick={() => handleTranslate('Speech')} />
        <InputMethodCard title="Image" description="Translate text in an image." onClick={() => handleTranslate('Image')} />
        <InputMethodCard title="PDF" description="Translate text in a PDF file." onClick={() => handleTranslate('PDF')} />
      </div>
      {translation && <TranslationResult result={translation} />}
    </div>
  );
};

export default Dashboard;
