import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Itinerary from './pages/Itinerary';
import Recommendations from './pages/Recommendations';
import EmergencyPage from './pages/EmergencyPage';
import './index.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/emergencypage" element={<EmergencyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
