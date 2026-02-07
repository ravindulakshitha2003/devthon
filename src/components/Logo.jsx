import React from 'react';

const Logo = ({ size = 'medium' }) => {
  const sizes = {
    small: { width: 80, height: 24 },
    medium: { width: 120, height: 36 },
    large: { width: 160, height: 48 }
  };

  const { width, height } = sizes[size];

  return (
    <div style={{ width: `${width}px`, height: `${height}px`, display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg width={height} height={height} viewBox="0 0 48 48" fill="none">
        {/* Robot Chat Bubble */}
        <path
          d="M24 4C13.5 4 5 12.5 5 23C5 28 7 32.5 10.5 35.5L8 44L17 41C19.3 42 21.6 42.5 24 42.5C34.5 42.5 43 34 43 23.5C43 13 34.5 4 24 4Z"
          fill="url(#gradient1)"
        />
        {/* Robot Face */}
        <circle cx="18" cy="20" r="3" fill="white" />
        <circle cx="30" cy="20" r="3" fill="white" />
        <path
          d="M18 28C18 28 20 30 24 30C28 30 30 28 30 28"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Antenna */}
        <line x1="24" y1="4" x2="24" y2="0" stroke="#1ABC9C" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="0" r="2" fill="#1ABC9C" />
        <defs>
          <linearGradient id="gradient1" x1="5" y1="4" x2="43" y2="44">
            <stop offset="0%" stopColor="#1F6AE1" />
            <stop offset="100%" stopColor="#1ABC9C" />
          </linearGradient>
        </defs>
      </svg>
      <span style={{
        fontSize: `${height * 0.5}px`,
        fontWeight: '700',
        background: 'linear-gradient(135deg, #1F6AE1 0%, #1ABC9C 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        tuora
      </span>
    </div>
  );
};

export default Logo;
