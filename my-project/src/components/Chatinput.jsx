import React, { useState, useRef, useEffect } from 'react';

/**
 * ChatInput Component
 * Handles user input and message submission
 * 
 * @param {Function} onSendMessage - Callback function to send message
 * @param {boolean} isDisabled - Whether input should be disabled (e.g., while loading)
 */
const ChatInput = ({ onSendMessage, isDisabled }) => {
  // Local state for input field
  const [inputValue, setInputValue] = useState('');
  
  // Reference to input element for focus management
  const inputRef = useRef(null);

  /**
   * Handles input field changes
   */
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  /**
   * Handles sending the message
   * Clears input field after sending
   */
  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    
    // Don't send empty messages
    if (!trimmedValue || isDisabled) {
      return;
    }

    // Call parent callback with message
    onSendMessage(trimmedValue);

    // Clear input field
    setInputValue('');

    // Return focus to input for better UX
    inputRef.current?.focus();
  };

  /**
   * Handles Enter key press for sending messages
   * Shift+Enter creates a new line (if textarea)
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      handleSubmit();
    }
  };

  /**
   * Focus input field when component mounts
   */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          className="chat-input"
          placeholder={isDisabled ? "Waiting for response..." : "Type your message..."}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={isDisabled}
          aria-label="Chat message input"
        />

        {/* Send Button */}
        <button
          className="send-button"
          onClick={handleSubmit}
          disabled={isDisabled || !inputValue.trim()}
          aria-label="Send message"
        >
          <svg 
            className="send-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" 
            />
          </svg>
          <span className="send-text">Send</span>
        </button>
      </div>

      {/* Character counter or helper text (optional) */}
      {inputValue.length > 0 && (
        <div className="input-helper-text">
          Press Enter to send • {inputValue.length} characters
        </div>
      )}
    </div>
  );
};

export default ChatInput;