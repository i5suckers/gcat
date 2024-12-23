import { useState, useCallback } from 'react';
import { useGameLoop } from './useGameLoop';
import { Obstacle, PlayerState } from '../types/game';
import { useControls } from './useControls';
import { PHYSICS, POWER_UPS } from '../constants/physics';

export const useGameState = () => {
  const [playerY, setPlayerY] = useState(0);
  const [playerVelocity, setPlayerVelocity] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([{ x: 800, type: 'low', passed: false }]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isDashing, setIsDashing] = useState(false);
  const [isCrouching, setIsCrouching] = useState(false);
  const [playerState, setPlayerState] = useState<PlayerState>({
    canDoubleJump: true,
    isShielded: false,
    powerUpCooldown: false
  });

  const jump = useCallback(() => {
    if (playerY === 0 || playerState.canDoubleJump) {
      const force = playerY === 0 ? PHYSICS.JUMP_FORCE : PHYSICS.DOUBLE_JUMP_FORCE;
      setPlayerVelocity(force);
      if (playerY !== 0) {
        setPlayerState(prev => ({ ...prev, canDoubleJump: false }));
      }
    }
  }, [playerY, playerState.canDoubleJump]);

  const dash = useCallback(() => {
    if (!isDashing && !isCrouching) {
      setIsDashing(true);
      setTimeout(() => setIsDashing(false), 500);
    }
  }, [isDashing, isCrouching]);

  const crouch = useCallback(() => {
    if (!isCrouching && !isDashing && playerY === 0) {
      setIsCrouching(true);
      setTimeout(() => setIsCrouching(false), 500);
    }
  }, [isCrouching, isDashing, playerY]);

  const activateShield = useCallback(() => {
    if (!playerState.powerUpCooldown) {
      setPlayerState(prev => ({ ...prev, isShielded: true, powerUpCooldown: true }));
      setTimeout(() => {
        setPlayerState(prev => ({ ...prev, isShielded: false }));
      }, POWER_UPS.SHIELD_DURATION);
      setTimeout(() => {
        setPlayerState(prev => ({ ...prev, powerUpCooldown: false }));
      }, POWER_UPS.COOLDOWN);
    }
  }, [playerState.powerUpCooldown]);

  const reset = () => {
    setPlayerY(0);
    setPlayerVelocity(0);
    setObstacles([{ x: 800, type: 'low', passed: false }]);
    setScore(0);
    setIsGameOver(false);
    setIsDashing(false);
    setIsCrouching(false);
    setPlayerState({
      canDoubleJump: true,
      isShielded: false,
      powerUpCooldown: false
    });
  };

  const updateGame = useCallback(() => {
    if (isGameOver) return;

    // Update player position
    setPlayerY(prevY => {
      const newY = prevY + playerVelocity;
      return Math.max(0, newY);
    });

    // Update velocity with gravity
    setPlayerVelocity(prevVelocity => {
      if (playerY === 0 && prevVelocity < 0) return 0;
      return prevVelocity - PHYSICS.GRAVITY;
    });

    // Update obstacles
    setObstacles(prevObstacles => {
      const newObstacles = prevObstacles.map(obstacle => ({
        ...obstacle,
        x: obstacle.x - PHYSICS.GAME_SPEED
      }));

      // Add new obstacle
      if (newObstacles[newObstacles.length - 1].x < PHYSICS.OBSTACLE_SPACING) {
        newObstacles.push({
          x: 800,
          type: 'low', // Only ground obstacles
          passed: false
        });
      }

      // Remove off-screen obstacles and update score
      const filteredObstacles = newObstacles.filter(obs => {
        if (obs.x < -50) return false;
        if (!obs.passed && obs.x < 100) {
          obs.passed = true;
          setScore(prev => prev + 1);
        }
        return true;
      });

      // Check collision
      if (!isDashing && !playerState.isShielded) {
        const playerRect = {
          x: 100,
          y: playerY,
          width: 40,
          height: isCrouching ? 25 : 50
        };

        filteredObstacles.forEach(obs => {
          const obsRect = {
            x: obs.x,
            y: 50, // Ground level
            width: 40,
            height: 100
          };

          if (
            playerRect.x < obs.x + obsRect.width &&
            playerRect.x + playerRect.width > obs.x &&
            playerRect.y < obsRect.height &&
            !isDashing
          ) {
            setIsGameOver(true);
          }
        });
      }

      return filteredObstacles;
    });
  }, [playerY, playerVelocity, isGameOver, isDashing, isCrouching, playerState.isShielded]);

  useGameLoop(updateGame);
  useControls({ jump, dash, crouch, activateShield, reset, isGameOver });

  return {
    playerY,
    playerVelocity,
    obstacles,
    score,
    isGameOver,
    isDashing,
    isCrouching,
    playerState,
    actions: {
      jump,
      dash,
      crouch,
      activateShield,
      reset
    }
  };
};