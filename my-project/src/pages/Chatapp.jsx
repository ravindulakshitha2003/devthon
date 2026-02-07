import React, { useState, useRef } from 'react';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import '../components/chatbot.css';

/**
 * Main ChatApp Component
 * Manages the entire chat application state and API communication
 */
const ChatApp = () => {
  // State for storing all chat messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);

  // State for tracking if bot is currently responding
  const [isLoading, setIsLoading] = useState(false);

  // State for error handling
  const [error, setError] = useState(null);

  // Reference for managing message IDs
  const messageIdCounter = useRef(2);

  /**
   * API Configuration
   * Change this URL to point to your actual backend endpoint
   */
  const API_URL = 'https://travel-ai-production-ae0f.up.railway.app/chat'; // Update this with your backend URL

  /**
   * Handles sending a message to the backend API
   * @param {string} userMessage - The message text from the user
   */
  const handleSendMessage = async (userMessage) => {
    // Prevent empty messages
    if (!userMessage.trim()) {
      return;
    }

    // Clear any previous errors
    setError(null);

    // Create user message object
    const userMessageObj = {
      id: messageIdCounter.current++,
      text: userMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessageObj]);

    // Set loading state to show "typing" indicator
    setIsLoading(true);

    try {
      // Make API call to backend
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage
        })
      });

      // Check if response is successful
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      // Parse JSON response
      const data = await response.json();

      // Create bot message object from API response
      const botMessageObj = {
        id: messageIdCounter.current++,
        text: data.reply || 'I apologize, but I received an empty response.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      // Add bot message to chat
      setMessages(prev => [...prev, botMessageObj]);

    } catch (err) {
      console.error('Error sending message:', err);
      
      // Set error state for user feedback
      setError(err.message);

      // Add error message to chat
      const errorMessageObj = {
        id: messageIdCounter.current++,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessageObj]);
    } finally {
      // Always turn off loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-app-container">
      <div className="chat-app">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-content">
            <div className="bot-avatar">
              <span>🤖</span>
            </div>
            <div className="chat-header-text">
              <h1>AI Assistant</h1>
              <p className="status-text">
                {isLoading ? 'Typing...' : 'Online'}
              </p>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button 
              className="error-close"
              onClick={() => setError(null)}
              aria-label="Close error"
            >
              ×
            </button>
          </div>
        )}

        {/* Chat Window */}
        <ChatWindow 
          messages={messages} 
          isLoading={isLoading}
        />

        {/* Input Area */}
        <ChatInput 
          onSendMessage={handleSendMessage}
          isDisabled={isLoading}
        />
      </div>
    </div>
  );
};

export default ChatApp;