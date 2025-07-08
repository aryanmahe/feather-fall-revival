
import { useEffect, useState } from "react";

interface BirdProps {
  y: number;
  velocity: number;
  gameState: 'playing' | 'gameOver';
}

export const Bird = ({ y, velocity, gameState }: BirdProps) => {
  const [flapping, setFlapping] = useState(false);
  
  useEffect(() => {
    if (velocity < -2) {
      setFlapping(true);
      const timer = setTimeout(() => setFlapping(false), 200);
      return () => clearTimeout(timer);
    }
  }, [velocity]);
  
  const rotation = Math.min(Math.max(velocity * 3, -30), 90);
  
  return (
    <div
      className={`absolute transition-transform duration-100 ${
        gameState === 'gameOver' ? 'animate-pulse' : ''
      }`}
      style={{
        left: '80px',
        top: `${y}px`,
        transform: `rotate(${rotation}deg)`,
        zIndex: 10
      }}
    >
      {/* Bird body */}
      <div className="relative">
        <div className={`w-8 h-8 bg-yellow-400 rounded-full border-2 border-yellow-600 transition-transform duration-150 ${
          flapping ? 'scale-110' : ''
        }`}>
          {/* Eye */}
          <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full">
            <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-black rounded-full"></div>
          </div>
          
          {/* Beak */}
          <div className="absolute top-2 -right-1 w-0 h-0 border-l-2 border-l-orange-500 border-t-1 border-t-transparent border-b-1 border-b-transparent"></div>
        </div>
        
        {/* Wings */}
        <div className={`absolute -top-1 -left-1 w-6 h-4 bg-yellow-500 rounded-full border border-yellow-600 transition-transform duration-150 ${
          flapping ? 'rotate-12 scale-110' : '-rotate-12'
        }`}></div>
        
        {/* Flap particles */}
        {flapping && (
          <>
            <div className="absolute -top-2 -left-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
            <div className="absolute -top-1 -left-3 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.1s' }}></div>
            <div className="absolute -top-3 -left-1 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          </>
        )}
      </div>
    </div>
  );
};
