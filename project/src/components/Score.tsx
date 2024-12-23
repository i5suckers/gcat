import React from 'react';

interface ScoreProps {
  score: number;
}

export const Score: React.FC<ScoreProps> = ({ score }) => (
  <div className="absolute top-4 right-4 text-2xl font-bold text-purple-300 font-gothic">
    Score: {score}
  </div>
);