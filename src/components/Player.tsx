import React from 'react';
import { Cat } from 'lucide-react';

interface PlayerProps {
  y: number;
  velocity: number;
  isDashing: boolean;
  isCrouching: boolean;
  isShielded?: boolean;
}

export const Player: React.FC<PlayerProps> = ({ 
  y, 
  velocity, 
  isDashing, 
  isCrouching,
  isShielded 
}) => {
  const getPlayerClass = () => {
    if (isDashing) return 'scale-x-125 rotate-[-10deg]';
    if (isCrouching) return 'scale-y-50';
    if (velocity < 0) return 'rotate-[-20deg]';
    return '';
  };

  return (
    <div 
      className={`absolute left-[100px] transition-transform duration-100 ${getPlayerClass()}`}
      style={{
        bottom: `${50 + y}px`,
        width: 50,
        height: 50,
      }}
    >
      <Cat 
        size={50} 
        className={`
          text-purple-400 
          drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]
          ${isDashing ? 'animate-pulse' : ''}
          ${isShielded ? 'ring-4 ring-purple-500 ring-opacity-50 rounded-full animate-pulse' : ''}
        `}
      />
    </div>
  );
};