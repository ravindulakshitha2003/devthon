import React from 'react';

/**
 * MessageBubble Component
 * Renders a single message bubble (user or bot)
 * 
 * @param {Object} message - Message object containing text, sender, timestamp, etc.
 */
const MessageBubble = ({ message }) => {
  const { text, sender, timestamp, isError } = message;

  // Format timestamp for display
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Determine CSS classes based on message sender
  const wrapperClass = sender === 'user' 
    ? 'message-wrapper user-message-wrapper' 
    : 'message-wrapper bot-message-wrapper';

  const bubbleClass = sender === 'user' 
    ? 'message-bubble user-bubble' 
    : `message-bubble bot-bubble ${isError ? 'error-bubble' : ''}`;

  return (
    <div className={wrapperClass}>
      <div className={bubbleClass}>
        {/* Message text */}
        <p className="message-text">{text}</p>
        
        {/* Timestamp */}
        <span className="message-time">
          {formatTime(timestamp)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;