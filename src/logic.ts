import type { RuneClient } from 'rune-games-sdk/multiplayer';

type Player = {
  sections: {x: number, y: number}[];
  direction: 'up' | 'down' | 'left' | 'right';
  speed: number;
}

export interface GameState {
  players: {
    [playerId: string]: Player;
  };
  food: {
    x: number;
    y: number;
  };
}

type GameActions = {
  changeDirection: (direction: Player['direction']) => void;
}

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

export const GAME_WIDTH = 450;
export const GAME_HEIGHT = 800;
export const UPDATES_PER_SECOND = 30;
export const PLAYER_SIZE = 10;
export const FOOD_SIZE = 10;
export const SPEED = 2;

const startPosition = [
  { x: GAME_WIDTH / 2 - 10, y: 0 },
  { x: GAME_WIDTH - 20, y: GAME_HEIGHT / 2 - 10 },
  { x: GAME_WIDTH / 2 - 10, y: GAME_HEIGHT -20 },
  { x: 0, y: GAME_HEIGHT / 2 - 10 },
];

const startDirection = [
  'down',
  'left',
  'up',
  'right',
];

const updatePosition = (player: Player) => {
  const head = player.sections[0];
  const newHead = { ...head };

  switch (player.direction) {
    case 'up':
      newHead.y -= player.speed;
      break;
    case 'down':
      newHead.y += player.speed;
      break;
    case 'left':
      newHead.x -= player.speed;
      break;
    case 'right':
      newHead.x += player.speed;
      break;
  }

  player.sections.unshift(newHead);
  player.sections.pop();
};

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  updatesPerSecond: UPDATES_PER_SECOND,
  setup: (allPlayers): GameState => {
    const players = allPlayers.reduce((acc, playerId, index) => {
      acc[playerId] = {
        sections: [startPosition[index]],
        direction: startDirection[index] as Player['direction'],
        speed: SPEED,
      };
      return acc;
    }, {} as GameState['players']);

    return {
      players,
      food: {
        x: Math.floor(Math.random() * (GAME_WIDTH - FOOD_SIZE)),
        y: Math.floor(Math.random() * (GAME_HEIGHT - FOOD_SIZE)),
      },
    };
  },
  actions: {
    changeDirection(params, actionContext) {
      const player = actionContext.game.players[actionContext.playerId];

      if (player.direction === 'up' && params === 'down') return;
      if (player.direction === 'down' && params === 'up') return;
      if (player.direction === 'left' && params === 'right') return;
      if (player.direction === 'right' && params === 'left') return;

      player.direction = params;
    },
  },
  update: ({ game }) => {
    Object.keys(game.players).forEach((playerId) => {
      const player = game.players[playerId];
      updatePosition(player);
    });
  }
});
