import React, { useState } from 'react';
import './EmergencyPage.css';

export default function EmergencyPage() {
  const [activeTab, setActiveTab] = useState("hospital");

  return (
    <div>
      <header className="home-header">
      
        <img src="/logo.png" alt="Tuora Logo" className="site-logo" />
        <button className="dashboard-link" onClick={() => navigate('/EmergencyPage')}>Dashboard</button>
        <button className="login-btn gradient-bg" onClick={() => navigate('/login')}>Login</button>
      
      </header>
      
      <main className="container">
        <h2>Emergency Center</h2>

        <div className="top-card">
          <div className="side-menu">
            <p
              className={activeTab === "hospital" ? "active" : ""}
              onClick={() => setActiveTab("hospital")}
            >
              Nearest Hospitals
            </p>

            <p
              className={activeTab === "police" ? "active" : ""}
              onClick={() => setActiveTab("police")}
            >
              Nearest Police Stations
            </p>

            <p
              className={activeTab === "location" ? "active" : ""}
              onClick={() => setActiveTab("location")}
            >
              View My Location
            </p>
          </div>

          <div className="map-area">
            <div className="map-placeholder">Map Preview</div>
            <button className="loc-btn">📍</button>
          </div>
        </div>

        <div className="bottom-section">
          <div className="contacts">
            <h3>Emergency Contact Information</h3>
            <p>Police Emergency: 118 / 119</p>
            <p>Ambulance & Fire: 110</p>
            <p>Suwaseriya Ambulance: 1990</p>
            <p>Tourist Police: 011-2421052</p>
            <p>Report Crimes: 011-2691500</p>
            <p>Accident Service (Colombo): 011-2691111</p>
          </div>

          {activeTab === "hospital" && (
            <div className="hospital-card">
              <h4>Durdans Hospital – Ella</h4>
              <p>0.5 km away</p>
            </div>
          )}

          {activeTab === "police" && (
            <div className="hospital-card">
              <h4>Ella Police Station</h4>
              <p>1.2 km away</p>
            </div>
          )}

          {activeTab === "location" && (
            <div className="location-card">
              <button className="location-btn">Show My Location</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}