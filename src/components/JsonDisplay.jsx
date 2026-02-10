import React from 'react';
import './JsonDisplay.css';

const JsonDisplay = ({ data }) => {
  if (!data) return <p>No data to display</p>;

  // If it's a trip array, display as cards
  if (data.trip && Array.isArray(data.trip)) {
    return (
      <div className="json-display trip-display">
        <div className="trip-preview-header">
          <h3>📍 Trip Plan Preview</h3>
          <p>{data.trip.length} activities planned</p>
        </div>
        <div className="trip-items">
          {data.trip.slice(0, 3).map((item, idx) => (
            <div key={idx} className="trip-item-card">
              <div className="trip-item-day">Day {item.day}</div>
              <div className="trip-item-name">{item.placeName}</div>
              <div className="trip-item-type">{item.type}</div>
              <div className="trip-item-location">{item.city}</div>
            </div>
          ))}
          {data.trip.length > 3 && (
            <div className="trip-item-more">
              +{data.trip.length - 3} more activities
            </div>
          )}
        </div>
      </div>
    );
  }

  // If it's an object, display as formatted JSON
  if (typeof data === 'object') {
    return (
      <div className="json-display">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }

  // Fallback for primitives
  return <div className="json-display">{String(data)}</div>;
};

export default JsonDisplay;
