import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import './TripPlan.css';

const TripPlan = () => {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(1);
  const { location } = useLocation();
   
  const { tripData: contextTripData } = useTripContext();

  console.log('Context Trip Data:', contextTripData);

  // Transform the trip data to match the expected format
  const transformTripData = (data) => {
    if (!data || !data.trip || data.trip.length === 0) {
      return null;
    }

    // Group activities by day
    const groupedByDay = data.trip.reduce((acc, place) => {
      if (!acc[place.day]) {
        acc[place.day] = [];
      }
      acc[place.day].push(place);
      return acc;
    }, {});

    // Get unique days and create days array
    const days = Object.keys(groupedByDay).map(day => ({
      day: parseInt(day),
      date: new Date(Date.now() + (parseInt(day) - 1) * 24 * 60 * 60 * 1000)
        .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    }));

    // Create activities array with timeline
    const activities = Object.keys(groupedByDay).map(day => {
      const items = groupedByDay[day].map((place, index) => {
        // Generate times starting from 9 AM with 2-3 hour intervals
        const startHour = 9 + (index * 2.5);
        const hour = Math.floor(startHour);
        const minute = (startHour % 1) * 60;
        const time = `${hour.toString().padStart(2, '0')}:${minute === 0 ? '00' : '30'} ${hour < 12 ? 'AM' : 'PM'}`;

        return {
          time: time,
          title: place.placeName,
          description: place.description,
          category: place.type,
          image: `https://source.unsplash.com/400x300/?${encodeURIComponent(place.imageQuery)}`,
          cost: place.costLKR
        };
      });

      return {
        day: parseInt(day),
        items: items
      };
    });

    // Calculate total budget
    const totalCost = data.trip.reduce((sum, place) => sum + (place.costLKR || 0), 0);

    return {
      title: `Trip to ${data.trip[0]?.city || 'Destination'}`,
      days: days,
      budget: `LKR ${totalCost.toLocaleString()}`,
      activities: activities
    };
  };

  const tripDataAll = transformTripData(contextTripData);

  // If no trip data, show empty state
  if (!tripDataAll) {
    return (
      <div className="trip-plan-page">
        <header className="home-header">
          <img src="/logo.png" alt="Tuora Logo" className="site-logo" />
          <button className="dashboard-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="login-btn gradient-bg" onClick={() => navigate('/login')}>Login</button>
        </header>
        <main className="trip-plan-main">
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2>No trip data available</h2>
            <p>Please create a trip first</p>
          </div>
        </main>
      </div>
    );
  }

  const currentDayActivities = tripDataAll.activities.find(a => a.day === activeDay)?.items || [];

  // Collect all place names into `newlocation` regardless of incoming structure
  const newlocation = useMemo(() => {
    const names = [];
    const pushName = (n) => { if (n && typeof n === 'string') names.push(n.trim()); };

    if (!tripDataAll) return [];

    // Case: tripData is an array of places
    if (Array.isArray(tripDataAll)) {
      tripDataAll.forEach(p => pushName(p.placeName || p.name || p.title || p.label));
    }

    // Case: { trip: [...] }
    if (tripDataAll.trip && Array.isArray(tripDataAll.trip)) {
      tripDataAll.trip.forEach(p => pushName(p.placeName || p.name || p.title || p.label));
    }

    // Case: trip plan with activities -> items
    if (tripDataAll.activities && Array.isArray(tripDataAll.activities)) {
      tripDataAll.activities.forEach(act => {
        if (!act || !Array.isArray(act.items)) return;
        act.items.forEach(it => pushName(it.placeName || it.title || it.name || it.label));
      });
    }

    // Deduplicate while preserving order
    return Array.from(new Set(names));
  }, [tripDataAll]);

  console.log('newlocation:', newlocation);

  return (
    <div className="trip-plan-page">
      {/* Header */}
      <header className="home-header">
        <img src="/logo.png" alt="Tuora Logo" className="site-logo" />
        <button className="dashboard-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button className="login-btn gradient-bg" onClick={() => navigate('/login')}>Login</button>
      </header>

      {/* Main Content */}
      <main className="trip-plan-main">
        {/* Trip Header */}
        <div className="trip-header-section">
          <div className="trip-title-area">
            <h1 className="trip-title">{tripDataAll.title}</h1>
            <div className="day-tabs">
              {tripDataAll.days.map((day) => (
                <button
                  key={day.day}
                  className={`day-tab ${activeDay === day.day ? 'active' : ''}`}
                  onClick={() => setActiveDay(day.day)}
                >
                  Day {day.day} · {day.date}
                </button>
              ))}
            </div>
          </div>
          <div className="trip-actions">
            <button className="bookmark-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="budget-badge">
              <div className="budget-label">Budget</div>
              <div className="budget-amount">{tripDataAll.budget}</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          {currentDayActivities.map((activity, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-time">{activity.time}</div>
              <div className="timeline-content">
                <div className="activity-card">
                  <div className="activity-image">
                    <img src={activity.image} alt={activity.title} />
                  </div>
                  <div className="activity-details">
                    <div className="activity-header">
                      <h3 className="activity-title">{activity.title}</h3>
                      {activity.category && (
                        <span className="activity-category">{activity.category}</span>
                      )}
                    </div>
                    <p className="activity-description">{activity.description}</p>
                    {activity.cost > 0 && (
                      <p className="activity-cost">Cost: LKR {activity.cost.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button className="nav-btn" onClick={() => navigate('/chat')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Chat</span>
        </button>
        
        <button className="nav-btn active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="4" x2="9" y2="9" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Plan</span>
        </button>
        
        <button className="nav-btn" onClick={() => navigate('/mappage')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Map</span>
        </button>
      </div>
    </div>
  );
};

export default TripPlan;