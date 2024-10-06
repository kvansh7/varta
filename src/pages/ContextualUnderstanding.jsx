import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [idiom, setIdiom] = useState('');
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      // Send hindi_idiom key to match the Flask backend
      const response = await axios.post('http://localhost:5000/translate', { hindi_idiom: idiom });
      
      setTranslation(response.data);
    } catch (error) {
      console.error('Error translating idiom:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Hindi Idiom Translator
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter a Hindi idiom"
            value={idiom}
            onChange={(e) => setIdiom(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleTranslate}
          disabled={loading || !idiom}
          className={`w-full p-2 rounded-md text-white font-semibold
            ${loading || !idiom 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>
        {translation && (
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Hindi Meaning:</h3>
              <p className="text-gray-600">{translation.hindi_meaning}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">English Translation:</h3>
              <p className="text-gray-600">{translation.english_translation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
