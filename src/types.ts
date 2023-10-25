import type { RuneClient } from 'rune-games-sdk/multiplayer';

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

export type PlayerSection = {
  x: number;
  y: number;
  active: boolean;
  direction: Player['direction'];
  pendingChangeDirection?: Player['direction'];
}

export type Player = {
  sections: PlayerSection[];
  direction: 'up' | 'down' | 'left' | 'right';
  speed: number;
  upgrades: number;
  dead: boolean;
  ready: boolean;
}

export interface GameState {
  players: {
    [playerId: string]: Player;
  };
  food: {
    x: number;
    y: number;
  };
  state: 'waiting' | 'playing' | 'gameover';
}

export type GameActions = {
  changeDirection: (direction: Player['direction']) => void;
  increaseSpeed: () => void;
  increaseLength: () => void;
  ready(): () => void;
}

export type ActionContext = {
  game: GameState;
  playerId: string;
  allPlayerIds: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action = (payload: any, context: ActionContext) => void;

export type UpdateContext = {
  game: GameState;
  allPlayerIds: string[];
}

export type Update = (context: UpdateContext) => void;