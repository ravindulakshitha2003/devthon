import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import JsonDisplay from '../components/JsonDisplay';
import './Chat.css';
import './Home.css';
import TripPlan from './TripPlan';

const parseMessageContent = (text) => {
  try {
    const trimmedText = text.trim();
    if ((trimmedText.startsWith('{') || trimmedText.startsWith('[')) &&
        (trimmedText.endsWith('}') || trimmedText.endsWith(']'))) {
      const parsed = JSON.parse(trimmedText);
      return { isJson: true, data: parsed };
    }
  } catch (e) {
    // Not valid JSON, treat as plain text
  }
  return { isJson: false, text };
};

function Chat() {
  const [data,setdata]=useState(['one massegae']);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi there! 👋 I'm Tuora, your AI travel companion. I'm here to help you plan an amazing trip! Where would you like to go?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messageIdCounter = useRef(messages.length + 1);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { setTripData } = useTripContext();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const text = inputValue;
    if (!text.trim()) return;
    setError(null);

    const userMessageObj = {
      id: messageIdCounter.current++,
      type: 'user',
      text: text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessageObj]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const resp = await fetch('https://travel-ai-production-ae0f.up.railway.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      if (!resp.ok) throw new Error(`Chat service error: ${resp.status}`);
      const data = await resp.json();
      console.log('API Response:', data);
      
      // Get the bot response text
      const botText = data.reply || data.message || data.text || JSON.stringify(data);
      console.log('Bot Text:', botText);
      
      // Parse to check if it's JSON
      const parsedContent = parseMessageContent(botText);
      console.log('Parsed Content:', parsedContent);
      // If the response is JSON, treat it as trip data
      if (parsedContent.isJson) {
        console.log('JSON data detected, setting trip data...', parsedContent.data);
        // Store trip data in context
        setTripData(parsedContent.data);
        

        // Add bot message indicating navigation
        const botMessage = {
          id: messageIdCounter.current++,
          type: 'bot',
          text: 'I created a trip plan for you — opening the plan page now.',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, botMessage]);

        // Navigate to TripPlan after a short delay
        setTimeout(() => {
          console.log('Navigating to /tripplan...');
          navigate('/tripplan');
        }, 1000);
        
        setIsLoading(false);
        setIsTyping(false);
        return;
      }

      // If API returned a trip plan structure with trip array
      if (data && data.trip && Array.isArray(data.trip) && data.trip.length > 0) {
        console.log('Trip array detected in response:', data.trip);
        setTripData(data.trip);

        const botMessage = {
          id: messageIdCounter.current++,
          type: 'bot',
          text: 'I created a trip plan for you — opening the plan page now.',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, botMessage]);

        setTimeout(() => {
          console.log('Navigating to /tripplan with trip data...');
          navigate('/tripplan');
        }, 1000);
        
        setIsLoading(false);
        setIsTyping(false);
        return;
      }

      // Regular text response
      console.log('Regular text response:', botText);
      const botMessage = {
        id: messageIdCounter.current++,
        type: 'bot',
        text: botText,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('❌ Chat API Error:', err);
      console.error('Error Details:', err.message);
      setError(err.message || 'Unknown error');
      const errorMsg = {
        id: messageIdCounter.current++,
        type: 'bot',
        text: 'Sorry, I could not reach the chat service right now. Please try again later.'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-page">
      <header className="home-header">
        <img src="/logo.png" alt="Tuora Logo" className="site-logo" />
        <button className="dashboard-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button className="login-btn gradient-bg" onClick={() => navigate('/login')}>Login</button>
      </header>

      <div className="chat-container">
        <div className="message-avatar">
          <div className="msg-icon">
            <img src="tuora-icon.png" alt="tuora-icon"></img>
          </div>
          <div>
            <span className="m-head">Tuora is here to assist you!</span><br></br>
            <span className="m-sub">Powered by Toura. Instant Recommendations</span>
          </div>
        </div>
        <div className="messages-area">
          {messages.map((message) => {
            const parsedContent = parseMessageContent(message.text);
            const timestamp = message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

            return (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-content">
                  <div className="message-bubble">
                    {parsedContent.isJson ? (
                      <TripPlan data={parsedContent.data} />
                    ) : (
                      <p>{parsedContent.text}</p>
                    )}
                  </div>
                  {timestamp && <span className="timestamp">{timestamp}</span>}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="message bot">
              <div className="message-avatar">
                <img src="tuora-icon.png" alt="tuora-icon"></img>
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <div className="input-container">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="chat-input" />
            <button
              onClick={handleSend}
              className="send-button"
              disabled={!inputValue.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="bottom-nav">
        <button className="nav-btn active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Chat</span>
        </button>
        
        <button className="nav-btn" onClick={() => navigate('/tripplan')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="4" x2="9" y2="9" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Plan</span>
        </button>
        
        <button className="nav-btn" onClick={() => navigate('/mappage')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Map</span>
        </button>
      </div>
    </div>
  );
}

export default Chat;