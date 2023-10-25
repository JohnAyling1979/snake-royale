import { BitmapText, Sprite, Stage } from '@pixi/react';
import Snake from '../snake/Snake';
import Apple from '../apple/Apple';
import { GameState } from '../../types';
import { GAME_HEIGHT, GAME_WIDTH, PLAYER_SIZE } from '../../constants';
import groundImage from '../../assets/ground.png';
import { InterpolatorLatency } from 'rune-games-sdk';

type ScreenProps = {
  player: string;
  game: GameState;
  enemyInterpolators: {[key: string]: InterpolatorLatency<number | number[]>};
};

const ground:[number, number][] = [];

for (let i = 0; i < GAME_WIDTH; i+=PLAYER_SIZE * 2) {
  for (let j = 0; j < GAME_HEIGHT; j+=PLAYER_SIZE * 2) {
    ground.push([i, j]);
  }
}

function Screen({player, game, enemyInterpolators}: ScreenProps) {
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
      {ground.map(([x, y]) => (
        <Sprite
          key={`${x}-${y}`}
          image={groundImage}
          x={x * scaleX}
          y={y * scaleY}
          width={PLAYER_SIZE * scaleX * 2}
          height={PLAYER_SIZE * scaleY * 2}
        />
      ))}
      {Object.keys(game.players).map((playerId) => {
        return (
          <Snake
            key={playerId}
            sections={game.players[playerId].sections}
            isPlayer={player === playerId}
            scaleX={scaleX}
            scaleY={scaleY}
            interpolator={enemyInterpolators[playerId]}
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
