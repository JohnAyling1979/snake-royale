import type { RuneClient } from 'rune-games-sdk/multiplayer';

type Player = {
  name: string;
  score: number;
}

export interface GameState {
  players: {
    [playerId: string]: Player;
  };
}

type GameActions = {
  eat: (params: { playerId: string}) => void;
}

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}


Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  setup: (): GameState => {
    return {
      players: {},
    };
  },
  actions: {
    eat: ({ playerId}, { game }) => {
      game.players[playerId].score += 1;
    },
  },
});
