import { PLAYER_SIZE } from '../constants';
import { Action } from '../types';

export const changeDirection: Action = (params, actionContext) => {
  const player = actionContext.game.players[actionContext.playerId];

  if (player.direction === 'up' && params === 'down') {
    return;
  }
  if (player.direction === 'down' && params === 'up') {
    return;
  }
  if (player.direction === 'left' && params === 'right') {
    return;
  }
  if (player.direction === 'right' && params === 'left') {
    return;
  }

  player.direction = params;
};

export const increaseSpeed: Action = (_params, actionContext) => {
  const player = actionContext.game.players[actionContext.playerId];
  player.speed++;
  player.upgrades--;
};

export const increaseLength: Action = (_params, actionContext) => {
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
};

export const ready: Action = (_params, actionContext) => {
  const player = actionContext.game.players[actionContext.playerId];
  player.ready = true;
};
