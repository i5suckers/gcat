import { useEffect, useCallback } from 'react';

interface Controls {
  jump: () => void;
  dash: () => void;
  crouch: () => void;
  activateShield: () => void;
  reset: () => void;
  isGameOver: boolean;
}

export const useControls = ({ jump, dash, crouch, activateShield, reset, isGameOver }: Controls) => {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowRight'].includes(e.code)) {
      e.preventDefault();
    }

    switch (e.code) {
      case 'Space':
      case 'ArrowUp':
      case 'KeyW':
        isGameOver ? reset() : jump();
        break;
      case 'KeyD':
      case 'ArrowRight':
        dash();
        break;
      case 'KeyS':
      case 'ArrowDown':
        crouch();
        break;
      case 'KeyF':
      case 'ShiftLeft':
        activateShield();
        break;
    }
  }, [jump, dash, crouch, activateShield, reset, isGameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
};