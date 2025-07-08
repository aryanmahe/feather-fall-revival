
interface GameScreenProps {
  gameState: 'start' | 'playing' | 'gameOver';
  score: number;
  onAction: () => void;
}

export const GameScreen = ({ gameState, score, onAction }: GameScreenProps) => {
  if (gameState === 'playing') return null;
  
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white rounded-lg p-8 text-center shadow-2xl max-w-xs mx-4">
        {gameState === 'start' ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Flappy Bird</h1>
            <div className="mb-6">
              <div className="w-16 h-16 bg-yellow-400 rounded-full border-4 border-yellow-600 mx-auto mb-4 relative animate-bounce">
                <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full">
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-black rounded-full"></div>
                </div>
                <div className="absolute top-4 -right-2 w-0 h-0 border-l-3 border-l-orange-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
            </div>
            <p className="text-gray-600 mb-6">Click or press SPACE to start flying!</p>
            <button
              onClick={onAction}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 hover:scale-105 transform"
            >
              Start Game
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over!</h2>
            <div className="mb-4">
              <p className="text-xl text-gray-700">Final Score</p>
              <p className="text-4xl font-bold text-blue-600">{score}</p>
            </div>
            <p className="text-gray-600 mb-6">
              {score === 0 ? "Better luck next time!" : 
               score < 5 ? "Keep practicing!" :
               score < 10 ? "Getting better!" :
               score < 20 ? "Great job!" : "Amazing score!"}
            </p>
            <button
              onClick={onAction}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 hover:scale-105 transform"
            >
              Play Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};
