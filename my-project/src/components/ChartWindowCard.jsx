import React, { useState } from 'react';
import './ChatWindowCard.css';

/**
 * ChatWindowCard Component
 * Displays trip itinerary in a card-based layout
 */
const ChatWindowCard = ({ tripData }) => {
  const [selectedDay, setSelectedDay] = useState(1);

  // Get unique days from trip data
  const days = tripData ? [...new Set(tripData.map(item => item.day))].sort() : [];

  // Filter places for selected day
  const selectedDayData = tripData ? tripData.filter(item => item.day === selectedDay) : [];

  // Format date (you can customize this based on your needs)
  const formatDate = (dayNumber) => {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + (dayNumber - 1));
    return baseDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Get city name for selected day
  const cityName = selectedDayData.length > 0 ? selectedDayData[0].city : '';

  return (
    <div className="chat-window-card">
      <div className="trip-container">
        {/* Trip Header */}
        <div className="trip-header">
          <div className="trip-title-section">
            <h2 className="trip-title">Trip to {cityName}</h2>
            <div className="trip-days-tabs">
              {days.map((day) => (
                <button
                  key={day}
                  className={`day-tab ${selectedDay === day ? 'active' : ''}`}
                  onClick={() => setSelectedDay(day)}
                >
                  Day {day}, {formatDate(day)}
                </button>
              ))}
            </div>
          </div>
          <div className="trip-actions">
            <button className="bookmark-btn" aria-label="Bookmark trip">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
            <button className="budget-btn">
              Budget<br/>
              <strong>LKR 37,000</strong>
            </button>
          </div>
        </div>

        {/* Places Timeline */}
        <div className="places-timeline">
          {selectedDayData.map((dayItem) => (
            dayItem.places.map((place, index) => (
              <div key={index} className="place-card">
                <div className="place-time">
                  {/* You can add time logic here if available */}
                  {index === 0 ? '11:00 AM' : index === 1 ? '13:00 PM' : index === 2 ? '14:00 PM' : '16:00 PM'}
                </div>
                <div className="place-content">
                  <div className="place-image">
                    <img 
                      src={`https://source.unsplash.com/200x150/?${encodeURIComponent(place.imageQuery || place.name)}`}
                      alt={place.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="place-details">
                    <div className="place-header">
                      <h3 className="place-name">{place.name}</h3>
                      <span className="place-type">{place.type}</span>
                    </div>
                    <p className="place-description">{place.description}</p>
                  </div>
                </div>
              </div>
            ))
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="trip-bottom-nav">
          <button className="nav-btn" aria-label="Overview">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </button>
          <button className="nav-btn" aria-label="Calendar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </button>
          <button className="nav-btn" aria-label="Map">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
              <line x1="8" y1="2" x2="8" y2="18"></line>
              <line x1="16" y1="6" x2="16" y2="22"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindowCard;