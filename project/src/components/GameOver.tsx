import React from 'react';

interface GameOverProps {
  score: number;
  onReset: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ score, onReset }) => (
  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
    <div className="text-center text-purple-300">
      <h2 className="text-4xl font-bold mb-4 font-gothic">Game Over</h2>
      <p className="text-xl mb-4">Final Score: {score}</p>
      <button
        onClick={onReset}
        className="px-6 py-3 bg-purple-900 rounded-lg hover:bg-purple-800 transition-colors duration-200 text-purple-100"
      >
        Play Again
      </button>
    </div>
  </div>
);