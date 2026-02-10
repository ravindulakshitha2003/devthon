
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Using central chat endpoint for dashboard data
import './Dashboard.css';

const Dashboard = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi I'm Toura, Your AI tour guide. I can help you explore places, suggest activities, food spots, and keep you safe during your journey."
    },
    {
      id: 2,
      sender: 'user',
      text: "How I am at Nene Arche Bridge. Can you exaplain me about this place"
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [tourPlans, setTourPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  // Fetch trip plans from API on component mount
  useEffect(() => {
    const fetchFromChatApi = async () => {
      try {
        // Ask the chat API for dashboard data
        const resp = await fetch('https://travel-ai-production-ae0f.up.railway.app/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'dashboard: get trip plans and stats' })
        });
        if (!resp.ok) throw new Error(`Chat service error: ${resp.status}`);
        const apiData = await resp.json();
        console.log('Dashboard API response:', apiData);

        // If API returns a trip array, use it; otherwise try to parse a trip field
        if (apiData && Array.isArray(apiData)) {
          setTourPlans(apiData);
        } else if (apiData && apiData.trip && Array.isArray(apiData.trip)) {
          setTourPlans(apiData.trip);
        } else {
          // Try to extract from reply text if it's JSON
          const replyText = apiData.reply || apiData.message || apiData.text;
          try {
            const parsed = replyText ? JSON.parse(replyText) : null;
            if (parsed && Array.isArray(parsed)) setTourPlans(parsed);
          } catch (e) {
            console.log('Dashboard: no structured trip plans in response, using fallback');
          }
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data from chat API:', error);
        setTourPlans([
          {
            id: 1,
            title: 'Trip to Ella',
            days: 3,
            budget: 37000
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFromChatApi();
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'user',
        text: inputMessage
      }]);
      setInputMessage('');
      
      // Send to chat API and append bot response
      // Show typing animation while we wait for the API
      setIsTyping(true);
      (async () => {
        try {
          const resp = await fetch('https://travel-ai-production-ae0f.up.railway.app/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: inputMessage })
          });
          if (!resp.ok) throw new Error(`Chat service error: ${resp.status}`);
          const apiData = await resp.json();
          console.log('Dashboard chat reply:', apiData);
          const botReply = apiData.reply || apiData.message || apiData.text || JSON.stringify(apiData);
          setMessages(prev => [...prev, { id: prev.length + 1, sender: 'bot', text: botReply }]);
        } catch (err) {
          console.error('Dashboard chat send error:', err);
          setMessages(prev => [...prev, { id: prev.length + 1, sender: 'bot', text: "Sorry, I couldn't reach the service." }]);
        } finally {
          setIsTyping(false);
        }
      })();
    }
  };

  return (
    <div className="dashboard-page">
      
      <header className="header">

        <img src="/logo.png" alt="Tuora Logo" className="site-logo" />
        <button className="dashboard-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button className="login-btn gradient-bg" onClick={() => navigate('/login')}>Login</button>

      </header>

      <div className="dashboard-container">
        <div className="left-section">
          <h1 className="main-title">
            Your journey with<br />
            Tuora is here!
          </h1>

          <div className="tour-plans-card">
            <h2>Your Tour Plans</h2>
            <div className="plans-grid">
              {tourPlans.map(plan => (
                <div key={plan.id} className="plan-card">
                  <h3>{plan.title}</h3>
                  <p className="plan-days">{plan.days} Days</p>
                  <p className="plan-budget">
                    Budget<br />
                    <span>LKR {plan.budget.toLocaleString()}</span>
                  </p>
                </div>
              ))}
              <div className="add-plan-card">
                <button className="add-plan-btn">
                  <span className="plus-icon">+</span>
                </button>
              </div>
            </div>
          </div>

          <button className="start-planning-btn" onClick={() => navigate('/chat')}>Start Planning</button>
          
          <button className="sos-btn" onClick={() => navigate('/emergencypage')}>SOS - Emergency Assistance</button>
        </div>

        <div className="right-section">
          <div className="chatbot-card">
            <div className="chatbot-header">
              <img src="tuora-icon.png" className="bot-avatar"></img>
              <h3>Ask from Toura</h3>
            </div>

            <div className="chat-messages">
              {messages.map(message => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className="message-bubble">
                    {message.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message bot">
                  <div className="message-bubble">
                    <div className="typing-indicator small">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="chat-input-container">
              <button className="attach-btn">📎</button>
              <input
                type="text"
                placeholder="Type your message here..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="chat-input"
              />
              <button className="send-btn" onClick={handleSendMessage}>
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;