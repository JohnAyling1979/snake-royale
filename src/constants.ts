import { PlayerSection } from './types';

export const GAME_WIDTH = 450;
export const GAME_HEIGHT = 600;
export const UPDATES_PER_SECOND = 30;
export const PLAYER_SIZE = 20;
export const FOOD_SIZE = 20;
export const SPEED = 2;
export const MAX_SPEED = PLAYER_SIZE / 2;

export const startPosition = [
  [
    { x: (GAME_WIDTH / 2) - (PLAYER_SIZE / 2), y: 0, active: true, direction: 'down' },
    { x: (GAME_WIDTH / 2) - (PLAYER_SIZE / 2), y: - PLAYER_SIZE, active: false, direction: 'down' },
  ],
  [
    { x: GAME_WIDTH - PLAYER_SIZE, y: (GAME_HEIGHT / 2) - (PLAYER_SIZE / 2), active: true, direction: 'left' },
    { x: GAME_WIDTH, y: (GAME_HEIGHT / 2) - (PLAYER_SIZE / 2), active: false, direction: 'left' },
  ],
  [
    { x: (GAME_WIDTH / 2) - (PLAYER_SIZE / 2), y: GAME_HEIGHT - PLAYER_SIZE, active: true, direction: 'up' },
    { x: (GAME_WIDTH / 2) - (PLAYER_SIZE / 2), y: GAME_HEIGHT, active: false, direction: 'up' },
  ],
  [
    { x: 0, y: (GAME_HEIGHT / 2) - (PLAYER_SIZE / 2), active: true, direction: 'right' },
    { x: - PLAYER_SIZE, y: GAME_HEIGHT / 2 - (PLAYER_SIZE / 2), active: false, direction: 'right' },
  ],
] as PlayerSection[][];

export const startDirection = [
  'down',
  'left',
  'up',
  'right',
];

