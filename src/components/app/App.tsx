import { useEffect, useRef, useState } from 'react';
import Screen from '../screen/Screen.tsx';
import ButtonSection from '../button-section/ButtonSection.tsx';
import { GameState } from '../../types.ts';
import { MAX_SPEED } from '../../constants.ts';
import { InterpolatorLatency } from 'rune-games-sdk';

const enemyInterpolators: { [key: string]: InterpolatorLatency<number | number[]> } = {};

function App() {
  const [game, setGame] = useState<GameState>();
  const [playerId, setPlayerId] = useState<string>('');
  const readRef = useRef<number>();

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId, futureGame }) => {
        setGame(game);
        setPlayerId(yourPlayerId ?? '');

        const opponents = Object.keys(game.players).filter((id) => id !== yourPlayerId);

        if (futureGame) {
          opponents.forEach((opponentId) => {
            if (!enemyInterpolators[opponentId]) {
              enemyInterpolators[opponentId] = Rune.interpolatorLatency({ maxSpeed: MAX_SPEED / 2 });
            }

            const gamePosition = [game.players[opponentId].sections[0].x, game.players[opponentId].sections[0].y];

            const futureGamePosition = [futureGame.players[opponentId].sections[0].x, futureGame.players[opponentId].sections[0].y];
            console.log(opponentId, gamePosition, futureGamePosition);
            enemyInterpolators[opponentId].update({
              game: gamePosition,
              futureGame: futureGamePosition,
            });
          });
        }
      },
    });
  }, []);

  if (!game) {
    return null;
  }

  const player = game.players[playerId];

  if (!player) {
    return <Screen player={playerId} game={game} enemyInterpolators={enemyInterpolators} />;
  }

  if (!player.ready && !readRef.current) {
    const timeout = setTimeout(() => {
      Rune.actions.ready();

      readRef.current = undefined;
    }, 1000);

    readRef.current = timeout as unknown as number;
  }

  return (
    <>
      <Screen player={playerId} game={game} enemyInterpolators={enemyInterpolators} />
      {!player.dead && !(game.state === 'gameover') && <ButtonSection canUpgrade={player.upgrades > 0} currentSpeed={game.players[playerId].speed} />}
    </>
  );
}

export default App;
