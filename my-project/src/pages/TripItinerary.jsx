import React from "react";
import "./TripItinerary.css";
import ImageCard from "../components/Imagecard";// Assuming your card component is here
import { useLocation } from "react-router-dom";
const TripItinerary = () => {
    
    const location = useLocation();
    const { placesArray } = location.state || {};
    var  sum=0;
    placesArray.forEach(element => {
      sum+= element.costLKR;
      
    });
  // All activity data
  const activities =placesArray ;
    


  return (
    <div className="trip-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo-icon">+</div>
            <span className="logo-text">tuora</span>
          </div>

          <div className="header-right">
            <button className="dashboard-btn">Dashboard</button>
            <button className="user-btn">
              <svg
                className="user-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Trip Header */}
        <div className="trip-header">
          <div className="trip-info">
            <h1>Trip to your choise </h1>
            <div className="trip-dates">
              {/* <span>Day 1, 24 Feb 2026</span>
              <span>Day 2, 25 Feb 2026</span>
              <span>Day 3, 26 Feb 2026</span> */}
            </div>
          </div>

          <div className="trip-actions">
            <button className="bookmark-btn">
              <svg
                className="bookmark-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
            <div className="budget-badge">
              <div className="budget-label">Budget</div>
              <div className="budget-amount">LKR {sum}</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline">
          <div className="timeline-line"></div>

          {/* Activities */}
          <div className="activities-list">
            {activities.map((activity) => (
                <ImageCard message={activity} />
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-content">
          <button className="nav-item">
            <svg
              className="nav-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="nav-label">Chat</span>
          </button>

          <button className="nav-item">
            <svg
              className="nav-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="nav-label">Itinerary</span>
          </button>

          <button className="nav-item active">
            <svg
              className="nav-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <span className="nav-label">Map</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default TripItinerary;
