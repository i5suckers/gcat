import React from 'react';
import { Player } from './Player';
import { Obstacles } from './Obstacles';
import { Score } from './Score';
import { GameOver } from './GameOver';
import { useGameState } from '../hooks/useGameState';
import { Ground } from './Ground';

export const Game = () => {
  const {
    playerY,
    playerVelocity,
    obstacles,
    score,
    isGameOver,
    isDashing,
    isCrouching,
    playerState,
    actions: { jump, dash, crouch, activateShield, reset }
  } = useGameState();

  return (
    <div 
      className="relative w-full h-[400px] bg-gray-950 overflow-hidden cursor-pointer"
      onClick={isGameOver ? reset : jump}
      role="button"
      tabIndex={0}
      aria-label="Game area"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
      
      <Player 
        y={playerY}
        velocity={playerVelocity}
        isDashing={isDashing}
        isCrouching={isCrouching}
        isShielded={playerState.isShielded}
      />
      
      <Obstacles obstacles={obstacles} />
      <Ground />
      <Score score={score} />
      
      {isGameOver && <GameOver score={score} onReset={reset} />}

      {/* Mobile Controls */}
      <div className="absolute bottom-20 left-4 right-4 flex justify-between md:hidden">
        <div className="flex gap-2">
          <button
            className="p-4 bg-purple-900/50 rounded-full text-purple-200 backdrop-blur-sm active:bg-purple-800/50"
            onClick={dash}
            aria-label="Dash"
          >
            Dash
          </button>
          <button
            className="p-4 bg-purple-900/50 rounded-full text-purple-200 backdrop-blur-sm active:bg-purple-800/50"
            onClick={activateShield}
            aria-label="Shield"
          >
            Shield
          </button>
        </div>
        <button
          className="p-4 bg-purple-900/50 rounded-full text-purple-200 backdrop-blur-sm active:bg-purple-800/50"
          onClick={crouch}
          aria-label="Slide"
        >
          Slide
        </button>
      </div>
    </div>
  );
};