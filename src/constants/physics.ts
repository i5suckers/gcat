// Game physics constants
export const PHYSICS = {
  JUMP_FORCE: 12,        // Lower jump for better control
  DOUBLE_JUMP_FORCE: 10, // Gentle double jump
  GRAVITY: 0.5,         // Reduced gravity for more control
  GAME_SPEED: 4,        // Slightly slower for better reaction time
  OBSTACLE_SPACING: 500  // More space between obstacles
} as const;

export const POWER_UPS = {
  SHIELD_DURATION: 2000,  // Shield lasts 2 seconds
  COOLDOWN: 3000         // Shorter cooldown (3 seconds)
} as const;