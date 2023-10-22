import type { RuneClient } from 'rune-games-sdk/multiplayer';


export type PlayerSection = {
  x: number;
  y: number;
  active: boolean;
  direction: Player['direction'];
  pendingChangeDirection?: Player['direction'];
}

type Player = {
  sections: PlayerSection[];
  direction: 'up' | 'down' | 'left' | 'right';
  speed: number;
  upgrades: number;
  dead: boolean;
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
export const MAX_SPEED = PLAYER_SIZE / 2;

const startPosition = [
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

const startDirection = [
  'down',
  'left',
  'up',
  'right',
];

const updateSnake = (player: Player) => {
  for (let i = player.sections.length - 1; i >= 0; i--) {
    const section = player.sections[i];

    if (i === 0) {
      section.direction = player.direction;
    } else {
      const previousSection = player.sections[i - 1];

      if (previousSection.direction !== section.direction && section.pendingChangeDirection === undefined) {
        section.pendingChangeDirection = previousSection.direction;
      }

      if (section.pendingChangeDirection) {
        if (section.direction === 'down') {
          if (previousSection.y <= section.y || previousSection.direction === 'down') {
            section.direction = section.pendingChangeDirection;
            section.pendingChangeDirection = undefined;
            section.y = previousSection.y;

            if (section.direction === 'left') {
              section.x = previousSection.x + PLAYER_SIZE;
            } else {
              section.x = previousSection.x - PLAYER_SIZE;
            }
          }
        } else if (section.direction === 'up') {
          if (previousSection.y >= section.y || previousSection.direction === 'up') {
            section.direction = section.pendingChangeDirection;
            section.pendingChangeDirection = undefined;
            section.y = previousSection.y;

            if (section.direction === 'left') {
              section.x = previousSection.x + PLAYER_SIZE;
            } else {
              section.x = previousSection.x - PLAYER_SIZE;
            }
          }
        } else if (section.direction === 'left') {
          if (previousSection.x >= section.x || previousSection.direction === 'left') {
            section.direction = section.pendingChangeDirection;
            section.pendingChangeDirection = undefined;
            section.x = previousSection.x;

            if (section.direction === 'up') {
              section.y = previousSection.y + PLAYER_SIZE;
            } else {
              section.y = previousSection.y - PLAYER_SIZE;
            }
          }
        } else if (section.direction === 'right') {
          if (previousSection.x <= section.x || previousSection.direction === 'right') {
            section.direction = section.pendingChangeDirection;
            section.pendingChangeDirection = undefined;
            section.x = previousSection.x;

            if (section.direction === 'up') {
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

const  checkAppleCollision = (player: Player, game: GameState) => {
  const head = player.sections[0];

  if (head.x <= game.food.x + FOOD_SIZE &&
    head.x + PLAYER_SIZE >= game.food.x &&
    head.y <= game.food.y + FOOD_SIZE &&
    head.y + PLAYER_SIZE >= game.food.y) {

    game.food.x = Math.floor(Math.random() * (GAME_WIDTH - FOOD_SIZE));
    game.food.y = Math.floor(Math.random() * (GAME_HEIGHT - FOOD_SIZE));

    player.upgrades++;
  }
};

const checkBorderCollision = (player: Player) => {
  const head = player.sections[0];

  if (head.x < 0 || head.x + PLAYER_SIZE > GAME_WIDTH || head.y < 0 || head.y + PLAYER_SIZE > GAME_HEIGHT) {
    player.dead = true;
  }
};

const checkGameOver = (game: GameState) => {
  const alivePlayers = Object.values(game.players).filter((player) => !player.dead);

  if (alivePlayers.length <= 1) {
    const players = Object.keys(game.players).reduce((acc, playerId) => {
      acc[playerId] = game.players[playerId].dead ? 'LOST' : 'WON';

      return acc;
    }, {} as Record<string, 'WON' | 'LOST'>);

    Rune.gameOver({
      players,
    });
  }
};

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  updatesPerSecond: UPDATES_PER_SECOND,
  setup: (allPlayers): GameState => {
    const players = allPlayers.reduce((acc, playerId, index) => {
      acc[playerId] = {
        sections: startPosition[index],
        direction: startDirection[index] as Player['direction'],
        speed: SPEED,
        upgrades: 0,
        dead: false,
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
      player.upgrades--;
    },
    increaseLength(_params, actionContext) {
      const player = actionContext.game.players[actionContext.playerId];
      const lastSection = player.sections[player.sections.length - 1];

      lastSection.active = true;

      switch (lastSection.direction) {
        case 'up':
          player.sections.push({
            x: lastSection.x,
            y: lastSection.y + PLAYER_SIZE,
            active: false,
            direction: lastSection.direction,
          });
          break;
        case 'down':
          player.sections.push({
            x: lastSection.x,
            y: lastSection.y - PLAYER_SIZE,
            active: false,
            direction: lastSection.direction,
          });
          break;
        case 'left':
          player.sections.push({
            x: lastSection.x + PLAYER_SIZE,
            y: lastSection.y,
            active: false,
            direction: lastSection.direction,
          });
          break;
        case 'right':
          player.sections.push({
            x: lastSection.x - PLAYER_SIZE,
            y: lastSection.y,
            active: false,
            direction: lastSection.direction,
          });
          break;
      }

      player.upgrades--;
    },
  },
  update: ({ game }) => {
    Object.keys(game.players).forEach((playerId) => {
      if (game.players[playerId].dead) return;

      updateSnake(game.players[playerId]);
      checkAppleCollision(game.players[playerId], game);
      checkBorderCollision(game.players[playerId]);

      checkGameOver(game);
    });
  }
});
