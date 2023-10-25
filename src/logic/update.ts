import { PLAYER_SIZE, FOOD_SIZE, GAME_WIDTH, GAME_HEIGHT, COLLISION_OFFSET } from '../constants';
import { GameState, Player, Update } from '../types';

export const update: Update = ({ game }) => {
  if (Object.keys(game.players).filter((playerId) => !game.players[playerId].ready).length > 0) {
    return;
  }

  Object.keys(game.players).forEach((playerId) => {
    const player = game.players[playerId];

    if (player.dead) {
      return;
    }

    updateSnake(player);
    checkAppleCollision(player, game);
    checkBorderCollision(player);
    checkPlayerCollision(playerId, game);
    checkGameOver(game);
  });
};

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

  if (head.x - COLLISION_OFFSET <= game.food.x + FOOD_SIZE &&
    head.x + COLLISION_OFFSET >= game.food.x &&
    head.y - COLLISION_OFFSET <= game.food.y + FOOD_SIZE &&
    head.y + COLLISION_OFFSET >= game.food.y) {

    game.food.x = Math.floor(Math.random() * (GAME_WIDTH - FOOD_SIZE));
    game.food.y = Math.floor(Math.random() * (GAME_HEIGHT - FOOD_SIZE));

    player.upgrades++;
  }
};

const checkBorderCollision = (player: Player) => {
  const head = player.sections[0];

  if (head.x - COLLISION_OFFSET < 0 || head.x + COLLISION_OFFSET > GAME_WIDTH || head.y - COLLISION_OFFSET < 0 || head.y + COLLISION_OFFSET > GAME_HEIGHT) {
    player.dead = true;
  }
};

const checkPlayerCollision = (currentPlayerId: string, game: GameState) => {
  const player = game.players[currentPlayerId];
  const head = game.players[currentPlayerId].sections[0];

  Object.keys(game.players).filter(playerId => playerId !== currentPlayerId).forEach((playerId) => {
    const otherPlayer = game.players[playerId];

    if (otherPlayer.dead) {
      return;
    }

    for (let i = 0; i < otherPlayer.sections.length; i++) {
      const section = otherPlayer.sections[i];

      if (!section.active) {
        continue;
      }

      if (head.x - COLLISION_OFFSET <= section.x + COLLISION_OFFSET &&
        head.x + COLLISION_OFFSET >= section.x - COLLISION_OFFSET &&
        head.y - COLLISION_OFFSET <= section.y + COLLISION_OFFSET &&
        head.y + COLLISION_OFFSET >= section.y - COLLISION_OFFSET
      ) {
        player.dead = true;
        return;
      }
    }
  });
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

