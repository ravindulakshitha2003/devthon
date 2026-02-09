import React, { useEffect, useRef } from 'react';
import MessageBubble from './Messagebubble.jsx';

/**
 * ChatWindow Component
 * Displays all chat messages in a scrollable container
 * Automatically scrolls to the latest message
 * 
 * @param {Array} messages - Array of message objects
 * @param {boolean} isLoading - Whether the bot is currently typing
 */
const ChatWindow = ({ messages, isLoading }) => {
  // Reference to the messages container for auto-scrolling
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  /**
   * Auto-scroll to bottom when new messages arrive
   * Uses smooth scrolling for better UX
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    });
  };

  // Scroll to bottom whenever messages change or loading state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="chat-window" ref={messagesContainerRef}>
      <div className="messages-container">
        {/* Render all messages */}
        {messages.map((message) => (
          <MessageBubble 
            key={message.id}
            message={message}
            
          />
        ))}

        {/* Show typing indicator when bot is responding */}
        {isLoading && (
          <div className="message-wrapper bot-message-wrapper">
            <div className="message-bubble bot-bubble typing-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              
            </div>
          </div>
        )}

        {/* Invisible element for auto-scroll target */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;