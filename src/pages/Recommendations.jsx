import React, { useState } from 'react';
import Logo from '../components/Logo';
import './Recommendations.css';

const Recommendations = () => {
  const [filter, setFilter] = useState('all');

  const recommendations = [
    {
      id: 1,
      category: 'restaurant',
      name: 'Sushi Saito',
      location: 'Roppongi, Tokyo',
      rating: 4.9,
      image: '🍣',
      description: 'Three Michelin-starred sushi restaurant',
      price: '¥¥¥¥'
    },
    {
      id: 2,
      category: 'attraction',
      name: 'TeamLab Borderless',
      location: 'Odaiba, Tokyo',
      rating: 4.8,
      image: '🎨',
      description: 'Digital art museum with immersive installations',
      price: '¥¥'
    },
    {
      id: 3,
      category: 'restaurant',
      name: 'Ichiran Ramen',
      location: 'Shibuya, Tokyo',
      rating: 4.6,
      image: '🍜',
      description: 'Famous tonkotsu ramen chain',
      price: '¥'
    },
    {
      id: 4,
      category: 'attraction',
      name: 'Tokyo Skytree',
      location: 'Sumida, Tokyo',
      rating: 4.7,
      image: '🗼',
      description: 'Tallest structure in Japan with panoramic views',
      price: '¥¥'
    },
    {
      id: 5,
      category: 'hotel',
      name: 'Park Hyatt Tokyo',
      location: 'Shinjuku, Tokyo',
      rating: 4.9,
      image: '🏨',
      description: 'Luxury hotel with stunning city views',
      price: '¥¥¥¥'
    },
    {
      id: 6,
      category: 'attraction',
      name: 'Tsukiji Outer Market',
      location: 'Chuo, Tokyo',
      rating: 4.5,
      image: '🐟',
      description: 'Fresh seafood and street food paradise',
      price: '¥¥'
    }
  ];

  const filteredRecommendations = filter === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.category === filter);

  return (
    <div className="recommendations-page">
      <header className="recommendations-header">
        <Logo size="small" />
        <h2>Explore Tokyo</h2>
      </header>

      <div className="recommendations-container">
        <div className="filter-bar">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'restaurant' ? 'active' : ''}`}
            onClick={() => setFilter('restaurant')}
          >
            🍴 Restaurants
          </button>
          <button 
            className={`filter-btn ${filter === 'attraction' ? 'active' : ''}`}
            onClick={() => setFilter('attraction')}
          >
            🎯 Attractions
          </button>
          <button 
            className={`filter-btn ${filter === 'hotel' ? 'active' : ''}`}
            onClick={() => setFilter('hotel')}
          >
            🏨 Hotels
          </button>
        </div>

        <div className="recommendations-grid">
          {filteredRecommendations.map((item) => (
            <div key={item.id} className="recommendation-card fade-in">
              <div className="card-image">
                <div className="category-badge">{item.category}</div>
                <span className="image-placeholder">{item.image}</span>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3>{item.name}</h3>
                  <div className="rating">
                    <span className="star">⭐</span>
                    <span>{item.rating}</span>
                  </div>
                </div>
                <p className="location">📍 {item.location}</p>
                <p className="description">{item.description}</p>
                <div className="card-footer">
                  <span className="price">{item.price}</span>
                  <button className="add-btn gradient-bg">
                    Add to Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
