import React from 'react';
import { Obstacle } from '../types/game';

interface ObstaclesProps {
  obstacles: Obstacle[];
}

export const Obstacles: React.FC<ObstaclesProps> = ({ obstacles }) => {
  return (
    <>
      {obstacles.map((obstacle, index) => (
        <div
          key={index}
          className="absolute bottom-[50px] h-[100px] w-[40px] bg-gradient-to-t from-purple-900 to-purple-600 rounded-md"
          style={{ left: `${obstacle.x}px` }}
        >
          <div className="absolute inset-0 bg-purple-800/20 animate-pulse" />
        </div>
      ))}
    </>
  );
};