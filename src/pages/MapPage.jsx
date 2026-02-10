import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useTripContext } from '../context/TripContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './MapPage.css';

// Fix Leaflet's default icon paths for bundlers
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapPage = () => {
  const navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});
  const [imageFailed, setImageFailed] = useState({});
  const { tripData: contextTripData } = useTripContext();
  
  var tempdata = ['The Secret Ella', 'Nine Arches Bridge'];
  
  const location = {
    name: 'Ella',
    nearbyCount: tempdata.length
  };

  try {
    if (contextTripData.tripData.trip.length > 0) {
      tempdata = [];
      contextTripData.tripData.trip.forEach(element => {
        tempdata.push(element.placeName);
      });
    }
  } catch (error) {
    console.error('Error processing trip data:', error);
  }
  
  console.log( tempdata [0] || contextTripData.trip[0].placeName );

  // All available recommendations
  const allRecommendations = [
    {
      id: 1,
      name: 'The Secret Ella',
      distance: '0.2 km away',
      type: 'Restaurant',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      lat: 6.8667,
      lng: 81.0461,
      color: '#FF6B6B'
    },
    {
      id: 2,
      name: 'Nine Arches Bridge',
      distance: '2.5 km away',
      type: 'Attraction',
      image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=400',
      lat: 6.8842,
      lng: 81.0608,
      color: '#4ECDC4'
    },
    {
      id: 3,
      name: "Little Adam's Peak",
      distance: '1.8 km away',
      type: 'Hiking',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      lat: 6.8550,
      lng: 81.0350,
      color: '#95E1D3'
    }
  ];

  // Filter recommendations to only show places in tempdata array
  const filteredRecommendations = allRecommendations.filter(place => 
    tempdata.includes(place.name)
  );

  const mapLegend = [
    { color: '#FF6B6B', label: 'Fully Cashless' },
    { color: '#4ECDC4', label: 'Partially Cashless' },
    { color: '#95E1D3', label: 'Cash only' }
  ];

  const handleGetDirections = () => {
    if (selectedPlace) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.lat},${selectedPlace.lng}`;
      window.open(url, '_blank');
    }
  };

  const handleImageLoad = (placeId) => {
    setImageLoaded(prev => ({ ...prev, [placeId]: true }));
  };

  const handleImageError = (placeId) => {
    setImageFailed(prev => ({ ...prev, [placeId]: true }));
  };

  return (
    <div className="map-page">
      {/* Header */}
      <header className="home-header">
        <img src="/logo.png" alt="Tuora Logo" className="site-logo" />
        <button className="dashboard-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button className="login-btn gradient-bg" onClick={() => navigate('/login')}>Login</button>
      </header>

      {/* Main Content */}
      <main className="map-main">
        {/* Location Info */}
        <div className="location-info">
          <h1 className="location-title">{location.name}</h1>
          <p className="location-subtitle">
            <span className="nearby-count">{location.nearbyCount}</span> Nearby Recommendations
          </p>
        </div>

        {/* Map Container */}
        <div className="map-wrapper">
          <div className="map-container">
            <MapContainer center={[6.8667, 81.0461]} zoom={13} style={{ height: '400px', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredRecommendations.map(place => (
                <Marker key={place.id} position={[place.lat, place.lng]} eventHandlers={{ click: () => setSelectedPlace(place) }}>
                  <Popup>
                    <strong>{place.name}</strong>
                    <div>{place.type}</div>
                    <div>{place.distance}</div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Map Controls */}
          <div className="map-controls">
            <button className="map-control-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 2V5M12 19V22M22 12H19M5 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="map-control-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <button className="map-control-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Map Legend */}
          <div className="map-legend">
            {mapLegend.map((item, index) => (
              <div key={index} className="legend-item">
                <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                <span className="legend-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Place Card */}
        {selectedPlace && (
          <div className="place-card">
            <div className="place-card-content">
              <div className="place-image">
                {!imageFailed[selectedPlace.id] ? (
                  <img
                    src={selectedPlace.image}
                    alt={selectedPlace.name}
                    onLoad={() => handleImageLoad(selectedPlace.id)}
                    onError={() => handleImageError(selectedPlace.id)}
                    style={{
                      opacity: imageLoaded[selectedPlace.id] ? 1 : 0.7,
                      transition: 'opacity 0.3s'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px'
                  }}>
                    📍
                  </div>
                )}
              </div>
              <div className="place-info">
                <h3 className="place-name">{selectedPlace.name}</h3>
                <p className="place-distance">{selectedPlace.distance}</p>
                <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                  {selectedPlace.type}
                </p>
              </div>
              <button className="directions-btn" onClick={handleGetDirections}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button className="nav-btn" onClick={() => navigate('/chat')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Chat</span>
        </button>
        
        <button className="nav-btn" onClick={() => navigate('/tripplan')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="4" x2="9" y2="9" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Plan</span>
        </button>
        
        <button className="nav-btn active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Map</span>
        </button>
      </div>
    </div>
  );
};

export default MapPage;