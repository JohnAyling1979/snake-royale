import { Stage } from '@pixi/react';
import Snake from '../snake/Snake';
import Apple from '../apple/Apple';
import { GameState } from '../../types';
import { GAME_HEIGHT, GAME_WIDTH } from '../../constants';


type ScreenProps = {
  player: string;
  game: GameState;
};

function Screen({player, game}: ScreenProps) {
  const scaleX = window.innerWidth / GAME_WIDTH;
  const scaleY = (window.innerHeight * .8) / GAME_HEIGHT;

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight * .8}
      options={{
        backgroundColor: 0x505050,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
      }}
    >
      {Object.keys(game.players).map((playerId) => {
        if (game.players[playerId].dead) {
          // return null;
        }

        return (
          <Snake
            key={playerId}
            sections={game.players[playerId].sections}
            isPlayer={player === playerId}
            scaleX={scaleX}
            scaleY={scaleY}
          />
        );
      })}
      <Apple
        food={game.food}
        scaleX={scaleX}
        scaleY={scaleY}
      />
    </Stage>
  );
}

export default Screen;
