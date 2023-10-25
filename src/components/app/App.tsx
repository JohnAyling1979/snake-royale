import { useEffect, useState } from 'react';
import Screen from '../screen/Screen.tsx';
import ButtonSection from '../button-section/ButtonSection.tsx';
import { GameState } from '../../types.ts';

function App() {
  const [game, setGame] = useState<GameState>();
  const [playerId, setPlayerId] = useState<string>('');

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId }) => {
        setGame(game);
        setPlayerId(yourPlayerId ?? '');
      },
    });

  }, []);

  if (!game) {
    return null;
  }

  const player = game.players[playerId];

  if (!player.ready) {
    Rune.actions.ready();
  }

  const hideButtonSection = player && player.dead;

  return (
    <>
      <Screen player={playerId} game={game} />
      {!hideButtonSection && <ButtonSection canUpgrade={player.upgrades > 0} currentSpeed={game.players[playerId].speed} />}
    </>
  );
}

export default App;
