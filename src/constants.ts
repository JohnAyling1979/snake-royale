import { PlayerSection } from './types';

export const GAME_WIDTH = 450;
export const GAME_HEIGHT = 600;
export const UPDATES_PER_SECOND = 30;
export const PLAYER_SIZE = 40;
export const FOOD_SIZE = 40;
export const SPEED = 2;
export const MAX_SPEED = PLAYER_SIZE / 2;
export const OFFSET = PLAYER_SIZE / 2;
export const COLLISION_OFFSET = PLAYER_SIZE / 2 - 5;

export const startPosition = [
  [
    { x: GAME_WIDTH / 2, y: OFFSET, active: true, direction: 'down' },
    { x: GAME_WIDTH / 2, y: - OFFSET, active: false, direction: 'down' },
  ],
  [
    { x: GAME_WIDTH - OFFSET, y: GAME_HEIGHT / 2, active: true, direction: 'left' },
    { x: GAME_WIDTH + OFFSET, y: GAME_HEIGHT / 2, active: false, direction: 'left' },
  ],
  [
    { x: GAME_WIDTH / 2, y: GAME_HEIGHT - OFFSET, active: true, direction: 'up' },
    { x: GAME_WIDTH / 2, y: GAME_HEIGHT + OFFSET, active: false, direction: 'up' },
  ],
  [
    { x: 0 + OFFSET, y: GAME_HEIGHT / 2, active: true, direction: 'right' },
    { x: 0 - OFFSET, y: GAME_HEIGHT / 2, active: false, direction: 'right' },
  ],
] as PlayerSection[][];

export const startDirection = [
  'down',
  'left',
  'up',
  'right',
];

