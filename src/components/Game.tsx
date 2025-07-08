
import { useState, useEffect, useCallback, useRef } from "react";
import { Bird } from "./Bird";
import { Pipe } from "./Pipe";
import { GameScreen } from "./GameScreen";
import { useGamePhysics } from "@/hooks/useGamePhysics";
import { useKeyboard } from "@/hooks/useKeyboard";

interface PipeData {
  id: number;
  x: number;
  gapY: number;
  passed: boolean;
}

export const Game = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameOver'>('start');
  const [score, setScore] = useState(0);
  const [pipes, setPipes] = useState<PipeData[]>([]);
  const [lastPipeId, setLastPipeId] = useState(0);
  const gameLoopRef = useRef<number>();
  
  const gameWidth = 400;
  const gameHeight = 600;
  const pipeGap = 120;
  const pipeWidth = 60;
  
  const { birdY, birdVelocity, jump, resetBird, updateBird } = useGamePhysics(gameHeight);
  
  const checkCollision = useCallback((birdY: number, pipes: PipeData[]) => {
    const birdX = 80;
    const birdSize = 30;
    
    // Check ground collision
    if (birdY > gameHeight - birdSize || birdY < 0) {
      return true;
    }
    
    // Check pipe collision
    for (const pipe of pipes) {
      if (birdX + birdSize > pipe.x && birdX < pipe.x + pipeWidth) {
        if (birdY < pipe.gapY || birdY + birdSize > pipe.gapY + pipeGap) {
          return true;
        }
      }
    }
    
    return false;
  }, [gameHeight, pipeWidth, pipeGap]);
  
  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;
    
    // Update bird physics
    updateBird();
    
    // Update pipes
    setPipes(prevPipes => {
      const newPipes = prevPipes.map(pipe => ({
        ...pipe,
        x: pipe.x - 3
      })).filter(pipe => pipe.x > -pipeWidth);
      
      // Add new pipe if needed
      const lastPipe = newPipes[newPipes.length - 1];
      if (!lastPipe || lastPipe.x < gameWidth - 300) {
        const newPipe: PipeData = {
          id: lastPipeId + 1,
          x: gameWidth,
          gapY: Math.random() * (gameHeight - pipeGap - 100) + 50,
          passed: false
        };
        setLastPipeId(prev => prev + 1);
        return [...newPipes, newPipe];
      }
      
      return newPipes;
    });
    
    // Check for scoring
    setPipes(prevPipes => {
      const updatedPipes = prevPipes.map(pipe => {
        if (!pipe.passed && pipe.x + pipeWidth < 80) {
          setScore(prev => prev + 1);
          return { ...pipe, passed: true };
        }
        return pipe;
      });
      return updatedPipes;
    });
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, updateBird, lastPipeId, gameWidth, gameHeight, pipeWidth, pipeGap]);
  
  // Check collision in separate effect
  useEffect(() => {
    if (gameState === 'playing' && checkCollision(birdY, pipes)) {
      setGameState('gameOver');
    }
  }, [gameState, birdY, pipes, checkCollision]);
  
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop]);
  
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setPipes([]);
    setLastPipeId(0);
    resetBird();
  };
  
  const handleJump = () => {
    if (gameState === 'playing') {
      jump();
    } else if (gameState === 'start') {
      startGame();
    } else if (gameState === 'gameOver') {
      setGameState('start');
    }
  };
  
  useKeyboard(' ', handleJump);
  
  return (
    <div className="relative">
      <div 
        className="relative bg-gradient-to-b from-sky-300 to-sky-500 border-4 border-gray-800 rounded-lg overflow-hidden cursor-pointer select-none"
        style={{ width: gameWidth, height: gameHeight }}
        onClick={handleJump}
      >
        {/* Background clouds */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-16 h-10 bg-white rounded-full opacity-70 animate-pulse"></div>
          <div className="absolute top-20 right-16 w-12 h-8 bg-white rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-32 left-20 w-20 h-12 bg-white rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Ground */}
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-green-600 to-green-400"></div>
        
        {/* Pipes */}
        {pipes.map(pipe => (
          <Pipe 
            key={pipe.id} 
            x={pipe.x} 
            gapY={pipe.gapY} 
            gapHeight={pipeGap}
            gameHeight={gameHeight}
            width={pipeWidth}
          />
        ))}
        
        {/* Bird */}
        {gameState !== 'start' && (
          <Bird 
            y={birdY} 
            velocity={birdVelocity}
            gameState={gameState}
          />
        )}
        
        {/* Score */}
        {gameState === 'playing' && (
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-white drop-shadow-2xl">
            {score}
          </div>
        )}
        
        {/* Game screens */}
        <GameScreen 
          gameState={gameState} 
          score={score} 
          onAction={handleJump}
        />
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-center text-white">
        <p className="text-sm">Click or press SPACE to flap!</p>
      </div>
    </div>
  );
};
