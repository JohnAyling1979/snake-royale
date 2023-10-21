import { useEffect, useState } from 'react';
import { GameState } from './logic.ts';
import './App.css';

function App() {
  const [game, setGame] = useState<GameState>();
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game }) => {
        setGame(game);
      },
    });
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <>
      Game
    </>
  );
}

export default App;
