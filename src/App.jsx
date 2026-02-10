import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Chat from './pages/Chat';
import TripPlan from './pages/TripPlan';
import BudgetPlanPage from './pages/BudgetPlanPage';
import EmergencyPage from './pages/EmergencyPage';
import Dashboard from './pages/Dashboard';
import './index.css';
import MapPage from './pages/MapPage';


function App() {
  return (
    <TripProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/tripplan" element={<TripPlan />} />
          <Route path="/mappage" element={<MapPage />} />
          <Route path="/budgetplanpage" element={<BudgetPlanPage />} />
          <Route path="/emergencypage" element={<EmergencyPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </TripProvider>
  );
}

export default App;
