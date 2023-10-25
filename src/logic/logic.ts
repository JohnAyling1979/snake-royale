import { UPDATES_PER_SECOND, startPosition, startDirection, SPEED, GAME_WIDTH, FOOD_SIZE, GAME_HEIGHT } from '../constants';
import { GameState, Player } from '../types';
import { changeDirection, increaseLength, increaseSpeed, ready } from './actions';
import { update } from './update';

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
        ready: false,
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
    changeDirection,
    increaseSpeed,
    increaseLength,
    ready,
  },
  events: {
    playerLeft: (playerId, eventContext) => {
      delete eventContext.game.players[playerId];
    }
  },
  update,
});
