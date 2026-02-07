import React, { useState, useRef, useEffect } from 'react';
import Logo from '../components/Logo';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi there! 👋 I'm Tuora, your AI travel companion. I'm here to help you plan an amazing trip! Where would you like to go?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: "That sounds like a wonderful destination! Let me help you plan the perfect trip. What are your main interests? (e.g., adventure, culture, food, relaxation)"
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-page">
      <header className="chat-header">
        <Logo size="small" />
        <div className="header-actions">
          <button className="icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12Z" fill="currentColor"/>
              <path d="M10 5C11.1046 5 12 4.10457 12 3C12 1.89543 11.1046 1 10 1C8.89543 1 8 1.89543 8 3C8 4.10457 8.89543 5 10 5Z" fill="currentColor"/>
              <path d="M10 19C11.1046 19 12 18.1046 12 17C12 15.8954 11.1046 15 10 15C8.89543 15 8 15.8954 8 17C8 18.1046 8.89543 19 10 19Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </header>

      <div className="chat-container">
        <div className="messages-area">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              {message.type === 'bot' && (
                <div className="message-avatar">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="16" fill="url(#avatarGradient)" />
                    <circle cx="12" cy="14" r="2" fill="white" />
                    <circle cx="20" cy="14" r="2" fill="white" />
                    <path d="M12 19C12 19 13.5 20.5 16 20.5C18.5 20.5 20 19 20 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="avatarGradient" x1="0" y1="0" x2="32" y2="32">
                        <stop offset="0%" stopColor="#1F6AE1" />
                        <stop offset="100%" stopColor="#1ABC9C" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              )}
              <div className="message-content">
                <div className="message-bubble">
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="message-avatar">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="url(#avatarGradient2)" />
                  <circle cx="12" cy="14" r="2" fill="white" />
                  <circle cx="20" cy="14" r="2" fill="white" />
                  <path d="M12 19C12 19 13.5 20.5 16 20.5C18.5 20.5 20 19 20 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="avatarGradient2" x1="0" y1="0" x2="32" y2="32">
                      <stop offset="0%" stopColor="#1F6AE1" />
                      <stop offset="100%" stopColor="#1ABC9C" />
                    </linearGradient>
                  </defs>
                </svg>
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
              className="chat-input"
            />
            <button 
              onClick={handleSend} 
              className="send-button"
              disabled={!inputValue.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
