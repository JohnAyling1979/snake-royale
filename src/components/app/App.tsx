import { useEffect, useState } from 'react';
import { GameState } from '../../logic.ts';
import Screen from '../screen/Screen.tsx';
import ButtonSection from '../button-section/ButtonSection.tsx';

type RunePlayer = {
  avatarUrl: string;
  displayName: string;
  playerId: string;
};

type RunePlayers = {
  [playerId: string]: RunePlayer;
};

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
    return <div>Loading...</div>;
  }

  return (
    <>
      <Screen player={playerId} game={game} />
      <ButtonSection canUpgrade={game.players[playerId].canUpgrade} />
    </>
  );
}

export default App;
