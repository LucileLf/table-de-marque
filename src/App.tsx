import { useEffect, useState } from 'react'
import GameTracker from './components/GameTracker'
import Navbar from './components/Navbar'
import TabContent from './components/TabContent'
import GameSetup from './components/GameSetup'
import { GameInfo, GameState } from './types'

export interface Tab {
  ref: string,
  title: string,
  imageTitle: string
}


const initialGameState: GameState = {
  gameName: '',
  nbrOfTeams: 0,
  teams: [],
  isOn: false,
};


export function App() {
  // const tabtest: Tab = {
  //   ref: 'hymnes',
  //   title: 'Hymnes',
  //   imageTitle: 'hymns'
  // };
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  console.log('gameState',gameState);

  useEffect(() => {
    const storedState = localStorage.getItem('gameState');
    if (storedState) {
      const parsedState: GameState = JSON.parse(storedState);
      if (parsedState.isOn) {
        setGameState(parsedState);
      }
    }
  }, []);

  const startGame = (gameInfo: GameInfo): void => {
    const newGameState = { ...gameInfo, isOn: true };
    setGameState(newGameState);
    console.log('from app', newGameState);
    localStorage.setItem('gameState', JSON.stringify(newGameState));
  };

  const endGame = (): void => {
    localStorage.removeItem('gameState');
    setGameState(initialGameState);
  };



  return (
    <>
      {gameState.isOn ? (
        <>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab ? (
            <TabContent activeTab={activeTab} />
          ) : (
            <GameTracker gameState={gameState} endGame={endGame} />
          )}
        </>
      ) : (
        <GameSetup startGame={startGame} />
      )}
    </>
  );
};

export default App
