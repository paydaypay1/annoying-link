import React from 'react';

export default function Airhorn() {
  // Path to the audio file
  const audioUrl = 'https://actions.google.com/sounds/v1/transportation/air_horn_in_close_hall_series.ogg';

  const playAirhorn = () => {
    const audio = new Audio(audioUrl);
    audio.play().catch(error => {
      console.error('Error playing the airhorn sound:', error);
    });
  };

  return (
    <button
      onClick={playAirhorn}
      style={{
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        fontSize: '24px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.1s ease',
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.75)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      🚨 HONK
    </button>
  );
};

