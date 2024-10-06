// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import TextTranslate from './pages/TextTranslate'; // Import the new page
import VoiceToVoice from './pages/VoiceToVoice'; // Import the new page
import ImageConversion from './pages/ImageConversion'; // Import the new page
import ContextualUnderstanding from './pages/ContextualUnderstanding'; // Import the new page

const App = () => {
  return (
    <Router>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/TextTranslate" element={<TextTranslate />} /> {/* New route */}
          <Route path="/VoiceToVoice" element={<VoiceToVoice />} /> {/* New route */}
          <Route path="/ImageConversion" element={<ImageConversion />} /> {/* New route */}
          <Route path="/ContextualUnderstanding" element={<ContextualUnderstanding />} /> {/* New route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
