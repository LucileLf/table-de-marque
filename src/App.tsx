import { useEffect, useMemo, useState } from 'react'
import GameTracker from './components/GameTracker'
import Navbar from './components/Navbar'
import TabContent from './components/TabContent'
import GameSetup from './components/GameSetup'
import { GameInfo, GameState } from './types'
import { useGameState } from './providers/GameStateProvider';


export interface Tab {
  ref: string,
  title: string,
  imageTitle: string
}


const initialGameState: GameState = {
  gameName: '',
  nbrOfTeams: 0,
  teams: [{
    name: '',
    score: 0,
    penalties: [false, false, false],
  }, {
    name: '',
    score: 0,
    penalties: [false, false, false],
  }],
  isOn: false,
};


const App = () => {

  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  // const [gameState, setGameState] = useState<GameState>(initialGameState);
  // localStorage.setItem('gameState', JSON.stringify(initialGameState));

  // const [gameIsOn, setGameIsOn] = useState(false)

  const initialGameInfo: GameInfo = {
    gameName: '',
    nbrOfTeams: 0,
    teams: [{
      name: '',
      score: 0,
      penalties: [false, false, false],
    }, {
      name: '',
      score: 0,
      penalties: [false, false, false],
    }],
  };

  const { startGame, loadGame, gameState } = useGameState()

  // useEffect(() => {
  //   console.log('App mounted');
  //   return () => {
  //     console.log('App will unmount');
  //   };
  // }, []);


  useEffect(() => {
    const storedState = localStorage.getItem('gameState');
    if (storedState) {
      console.log('fetching game state from local storage....')
      const parsedState: GameState = JSON.parse(storedState);
      console.log('current game state is', parsedState)
      if (parsedState.isOn) {
        console.log('game is currently on')
        // setGameIsOn(true)
        loadGame(parsedState)
        //fetch game state from browser: add function to provider (setGameState(parsedState);)
      }
    }
  }, []);


  return (
    // <GameStateProvider>
    <>
      {gameState.isOn ? (
        <>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab}/>
          {activeTab ? (
            <TabContent activeTab={activeTab} />
          ) : (
            <GameTracker />
          )}
        </>
      ) : (
        <GameSetup />
      )}
    </>
    // </GameStateProvider>
  );


}
export default App;
