
import { useState, useCallback, useRef } from "react";

export const useGamePhysics = (gameHeight: number) => {
  const [birdY, setBirdY] = useState(gameHeight / 2);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const velocityRef = useRef(0);
  const positionRef = useRef(gameHeight / 2);
  
  const gravity = 0.25;
  const jumpStrength = -8;
  
  const jump = useCallback(() => {
    velocityRef.current = jumpStrength;
    setBirdVelocity(jumpStrength);
  }, [jumpStrength]);
  
  const updateBird = useCallback(() => {
    velocityRef.current += gravity;
    positionRef.current += velocityRef.current;
    
    // Prevent bird from going above screen
    if (positionRef.current < 0) {
      positionRef.current = 0;
      velocityRef.current = 0;
    }
    
    setBirdY(positionRef.current);
    setBirdVelocity(velocityRef.current);
  }, [gravity]);
  
  const resetBird = useCallback(() => {
    const startY = gameHeight / 2;
    setBirdY(startY);
    setBirdVelocity(0);
    positionRef.current = startY;
    velocityRef.current = 0;
  }, [gameHeight]);
  
  return {
    birdY,
    birdVelocity,
    jump,
    resetBird,
    updateBird
  };
};
