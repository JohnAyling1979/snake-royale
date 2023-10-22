import type { RuneClient } from 'rune-games-sdk/multiplayer';


export type PlayerSection = {
  x: number;
  y: number;
  active: boolean;
  direction: Player['direction'];
}

type Player = {
  sections: PlayerSection[];
  direction: 'up' | 'down' | 'left' | 'right';
  speed: number;
  canUpgrade: boolean;
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
  increaseSpeed: () => void;
  increaseLength: () => void;
}

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

export const GAME_WIDTH = 450;
export const GAME_HEIGHT = 600;
export const UPDATES_PER_SECOND = 30;
export const PLAYER_SIZE = 20;
export const FOOD_SIZE = 20;
export const SPEED = 2;

const startPosition = [
  [
    { x: (GAME_WIDTH / 2) - (PLAYER_SIZE / 2), y: 0, active: true, direction: 'down' },
    { x: (GAME_WIDTH / 2) - (PLAYER_SIZE / 2), y: - PLAYER_SIZE, active: true, direction: 'down' },
  ],
  [
    { x: GAME_WIDTH - PLAYER_SIZE, y: (GAME_HEIGHT / 2) - (PLAYER_SIZE / 2), active: true, direction: 'left' },
    { x: GAME_WIDTH, y: (GAME_HEIGHT / 2) - (PLAYER_SIZE / 2), active: true, direction: 'left' },
  ],
  [
    { x: (GAME_WIDTH / 2) - (PLAYER_SIZE / 2), y: GAME_HEIGHT - PLAYER_SIZE, active: true, direction: 'up' },
    { x: (GAME_WIDTH / 2) - (PLAYER_SIZE / 2), y: GAME_HEIGHT, active: true, direction: 'up' },
  ],
  [
    { x: 0, y: (GAME_HEIGHT / 2) - (PLAYER_SIZE / 2), active: true, direction: 'right' },
    { x: - PLAYER_SIZE, y: GAME_HEIGHT / 2 - (PLAYER_SIZE / 2), active: true, direction: 'right' },
  ],
] as PlayerSection[][];

const startDirection = [
  'down',
  'left',
  'up',
  'right',
];

const updatePosition = (player: Player) => {
  for (let i = player.sections.length - 1; i >= 0; i--) {
    const section = player.sections[i];

    if (i === 0) {
      section.direction = player.direction;
    } else {
      const previousSection = player.sections[i - 1];

      if (previousSection.direction !== section.direction) {
        if (section.direction === 'down') {
          if (previousSection.y <= section.y) {
            section.direction = previousSection.direction;
            section.y = previousSection.y;

            if (previousSection.direction === 'left') {
              section.x = previousSection.x + PLAYER_SIZE;
            } else {
              section.x = previousSection.x - PLAYER_SIZE;
            }
          }
        }

        if (section.direction === 'up') {
          if (previousSection.y >= section.y) {
            section.direction = previousSection.direction;
            section.y = previousSection.y;

            if (previousSection.direction === 'left') {
              section.x = previousSection.x + PLAYER_SIZE;
            } else {
              section.x = previousSection.x - PLAYER_SIZE;
            }
          }
        }

        if (section.direction === 'left') {
          if (previousSection.x >= section.x) {
            section.direction = previousSection.direction;
            section.x = previousSection.x;

            if (previousSection.direction === 'up') {
              section.y = previousSection.y + PLAYER_SIZE;
            } else {
              section.y = previousSection.y - PLAYER_SIZE;
            }
          }
        }

        if (section.direction === 'right') {
          if (previousSection.x <= section.x) {
            section.direction = previousSection.direction;
            section.x = previousSection.x;

            if (previousSection.direction === 'up') {
              section.y = previousSection.y + PLAYER_SIZE;
            } else {
              section.y = previousSection.y - PLAYER_SIZE;
            }
          }
        }
      }
    }

    switch (section.direction) {
      case 'up':
        section.y -= player.speed;
        break;
      case 'down':
        section.y += player.speed;
        break;
      case 'left':
        section.x -= player.speed;
        break;
      case 'right':
        section.x += player.speed;
        break;
    }
  }
};

Rune.initLogic({
  minPlayers: 4,
  maxPlayers: 4,
  updatesPerSecond: UPDATES_PER_SECOND,
  setup: (allPlayers): GameState => {
    const players = allPlayers.reduce((acc, playerId, index) => {
      acc[playerId] = {
        sections: startPosition[index],
        direction: startDirection[index] as Player['direction'],
        speed: SPEED,
        canUpgrade: false,
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
    increaseSpeed(_params, actionContext) {
      const player = actionContext.game.players[actionContext.playerId];
      player.speed += 1;
    },
    increaseLength(_params, actionContext) {
      const player = actionContext.game.players[actionContext.playerId];
      const lastSection = player.sections[player.sections.length - 1];
      player.sections.push(lastSection);
    },
  },
  update: ({ game }) => {
    Object.keys(game.players).forEach((playerId) => {
      const player = game.players[playerId];
      updatePosition(player);
    });
  }
});
