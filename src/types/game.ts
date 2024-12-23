export interface Obstacle {
  x: number;
  type: 'high' | 'low' | 'full';
  passed: boolean;
}

export interface PlayerState {
  canDoubleJump: boolean;
  isShielded: boolean;
  powerUpCooldown: boolean;
}