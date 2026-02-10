import React from 'react';
import { useNavigate } from 'react-router-dom';
//import Logo from '../components/Logo';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="home-header">
      
        <img src="/logo.png" alt="Tuora Logo" className="site-logo" />
        <button className="dashboard-link" onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button className="login-btn gradient-bg" onClick={() => navigate('/login')}>Login</button>
      
      </header>

      <main className="home-main">
        <div className="hero-section">
          <div className="hero-icon">
            <img src="/tuora_head2.png" alt="logo-head" className="logo-head"></img>
          </div>

          <p className="hero-subtitle">
            AI-Powered Conversational Tourism Planner
          </p>
          
          <p className="hero-description">
            "Plan your trip through conversation"
          </p>

          <button className="cta-button gradient-bg" onClick={() => navigate('/chat')}>
            Start Planning
          </button>

          <div className="features">
            <div className="feature-item">
              <span className="feature-icon">🗺️</span>
              <span>Personalized trips</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💬</span>
              <span>Guided conversations</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span>AI-curated activity</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
