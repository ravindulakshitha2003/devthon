import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGoogleLogin = () => {
    // In production, this would trigger actual Google OAuth
    console.log('Google login clicked');
    // For demo, redirect to home after "login"
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleGuestLogin = () => {
    // For demo, redirect to chat as guest
    navigate('/chat');
  };

  const openLoginModal = () => {
    setIsModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="login-page">
      {/* Header */}
      <header className="login-header">
        <img src="/logo.png" alt="Tuora" className="header-logo" />
        <div className="header-right">
          <button className="dashboard-btn" onClick={() => navigate('/')}>
            <span>Dashboard</span>
            <div className="user-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 20C5 16.134 8.134 13 12 13C15.866 13 19 16.134 19 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="login-main">
        

      {/* Login Modal */}
        <div className="modal-overlay" onClick={closeLoginModal}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => navigate('/')}>
              <svg className="close-model-btn-svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="modal-content">
              {/* Logo in modal */}
              <div className="modal-logo">
                <img src="/tuora_head2.png" alt="Tuora" />
              </div>

              {/* Google Login Button */}
              <button className="google-login-btn" onClick={handleGoogleLogin}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
                  <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
                  <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
                  <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.737 7.395 3.977 10 3.977z" fill="#EA4335"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="divider">
                <span>or</span>
              </div>

              {/* Guest Login */}
              <button className="guest-login-btn" onClick={handleGuestLogin}>
                Continue as Guest
              </button>

              {/* Footer text */}
              <p className="modal-footer-text">
                Secure authentication powered by Google
              </p>
            </div>
          </div>
        </div>
      
      </main>
    </div>
  );
};

export default Login;
