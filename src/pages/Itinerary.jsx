import React, { useState } from 'react';
import Logo from '../components/Logo';
import './Itinerary.css';

const Itinerary = () => {
  const [activeDay, setActiveDay] = useState(1);

  const itinerary = {
    destination: 'Tokyo, Japan',
    duration: '5 Days',
    activities: [
      {
        day: 1,
        title: 'Day 1: Arrival & Asakusa',
        items: [
          {
            time: '10:00 AM',
            title: 'Senso-ji Temple',
            description: 'Visit Tokyo\'s oldest Buddhist temple',
            image: '🏯',
            duration: '2 hours'
          },
          {
            time: '1:00 PM',
            title: 'Nakamise Shopping Street',
            description: 'Browse traditional crafts and snacks',
            image: '🛍️',
            duration: '1.5 hours'
          },
          {
            time: '6:00 PM',
            title: 'Dinner in Asakusa',
            description: 'Try authentic tempura at a local restaurant',
            image: '🍱',
            duration: '1.5 hours'
          }
        ]
      },
      {
        day: 2,
        title: 'Day 2: Modern Tokyo',
        items: [
          {
            time: '9:00 AM',
            title: 'Shibuya Crossing',
            description: 'Experience the world\'s busiest intersection',
            image: '🚦',
            duration: '1 hour'
          },
          {
            time: '11:00 AM',
            title: 'Harajuku & Takeshita Street',
            description: 'Explore trendy fashion and street food',
            image: '👘',
            duration: '2 hours'
          },
          {
            time: '3:00 PM',
            title: 'Meiji Shrine',
            description: 'Peaceful shrine in the heart of the city',
            image: '⛩️',
            duration: '1.5 hours'
          }
        ]
      }
    ]
  };

  const currentDay = itinerary.activities.find(a => a.day === activeDay);

  return (
    <div className="itinerary-page">
      <header className="itinerary-header">
        <Logo size="small" />
        <div className="header-info">
          <h2>{itinerary.destination}</h2>
          <span className="duration-badge">{itinerary.duration}</span>
        </div>
        <button className="share-btn gradient-bg">Share Plan</button>
      </header>

      <div className="itinerary-container">
        <aside className="itinerary-sidebar">
          <h3>Your Journey</h3>
          <div className="day-selector">
            {itinerary.activities.map((day) => (
              <button
                key={day.day}
                className={`day-btn ${activeDay === day.day ? 'active' : ''}`}
                onClick={() => setActiveDay(day.day)}
              >
                <span className="day-number">Day {day.day}</span>
                <span className="day-title">{day.title.split(': ')[1]}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="itinerary-main">
          <div className="day-header">
            <h2>{currentDay.title}</h2>
            <button className="edit-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit Day
            </button>
          </div>

          <div className="timeline">
            {currentDay.items.map((item, index) => (
              <div key={index} className="timeline-item fade-in">
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  {index < currentDay.items.length - 1 && <div className="timeline-line"></div>}
                </div>
                <div className="activity-card">
                  <div className="activity-time">{item.time}</div>
                  <div className="activity-content">
                    <div className="activity-icon">{item.image}</div>
                    <div className="activity-info">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                      <span className="activity-duration">⏱️ {item.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="add-activity-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Activity
          </button>
        </main>
      </div>
    </div>
  );
};

export default Itinerary;
