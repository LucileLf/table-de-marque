import {PropsWithChildren, createContext, useCallback, useContext, useEffect, useState} from 'react'
import { GameInfo, GameState } from '../types';
import GameTracker from '../components/GameTracker';
import GameSetup from '../components/GameSetup';



const initialGameState: GameState = {
  gameName: '',
  nbrOfTeams: 0,
  teams: [
  //   {
  //   name: '',
  //   score: 0,
  //   penalties: [false, false, false],
  // }, {
  //   name: '',
  //   score: 0,
  //   penalties: [false, false, false],
  // }
],
  isOn: false,
};

// interface GameStateProviderProps {
//   children: React.ReactNode;
// }

type GameStateType = {
  gameState: GameState;
  startGame: (gameinfo: GameInfo) => void;
  loadGame: (stateFromBrowser: GameState) => void;
  endGame: () => void;
  updateScore: (teamIndex: number, action: 'increase' | 'decrease') => void;
  updatePenalty: (teamIndex: number, penaltyIndex: number) => void;
}

const GameStateContext = createContext<GameStateType | undefined>(undefined);

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};

export const GameStateProvider = ({ children }: PropsWithChildren) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // useEffect(() => {
  //   const storedState = localStorage.getItem('gameState');
  //   if (storedState) {
  //     console.log('fetching game state from local storage....')
  //     const parsedState: GameState = JSON.parse(storedState);
  //     console.log('current game state is', parsedState)
  //     if (parsedState.isOn) {
  //       console.log('game is currently on')
  //       setGameState(parsedState);
  //     }
  //   }
  // }, []);

  // const initialGameInfo: GameInfo = {
  //   gameName: '',
  //   nbrOfTeams: 0,
  //   teams: [{
  //     name: '',
  //     score: 0,
  //     penalties: [false, false, false],
  //   }, {
  //     name: '',
  //     score: 0,
  //     penalties: [false, false, false],
  //   }],
  // };

  const startGame = useCallback((gameInfo: GameInfo): void => {
    console.log("start game!");
    const newGameState = { ...gameInfo, isOn: true };
    setGameState(newGameState);
    console.log('from app', newGameState);
    localStorage.setItem('gameState', JSON.stringify(newGameState));
  }, []);

  const loadGame = useCallback((stateFromBrowser: GameState) => {
    setGameState(stateFromBrowser)
  }, [])

  const endGame = useCallback((): void => {
    localStorage.removeItem('gameState');
    setGameState(initialGameState);
  }, []);

  const updateScore = useCallback((teamIndex: number, action: 'increase' | 'decrease') => {
    console.log('hello from updateScore')
    setGameState((currentState) => {
      console.log('setgamestate from updatescore')
      const newTeams = [...currentState.teams];
      if (action === "increase") {
        newTeams[teamIndex].score += 1;
      } else if (action === "decrease" && newTeams[teamIndex].score > 0) {
        newTeams[teamIndex].score -= 1;
      }
      return { ...currentState, teams: newTeams };
    });
  }, []);


  const updatePenalty = useCallback((teamIndex: number, penaltyIndex: number) => {
    setGameState((prevState) => {
      console.log('hello from updatepenalty')
      // Map through the teams to find the one to update
      const updatedTeams = prevState.teams.map((team, index) => {
        if (index === teamIndex) {
          // Toggle the specific penalty status for this team
          const updatedPenalties  = prevState.teams[teamIndex].penalties.map((penalty, index) =>
            index === penaltyIndex ? !penalty : penalty
          );
          const allTrue = updatedPenalties.every((penalty) => penalty === true);
          if (allTrue) {
            // increase opponent score
            if (teamIndex === 0) {
              updateScore(1, 'increase')
            } else if (teamIndex === 1) {
              updateScore(0, 'increase')
            }
            // set all back to false
            const finalPenalties = updatedPenalties.map(() => false);
            return { ...team, penalties: finalPenalties  };
          }
          // Return a new team object with the updated penalties array
          return { ...team, penalties: updatedPenalties  };
        }
        return team; // Return other teams unchanged
      });
      // Return the new state with the updated teams array
      return { ...prevState, teams: updatedTeams };
    });
  }, [])

  // const renderChildren = () => {
  //   if (gameState.isOn) {
  //     return <GameTracker gameState={gameState} setGameState={setGameState} endGame={endGame}/>; // Render GameTracker if game is on
  //     //<>
  //     // <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
  //     // {activeTab ? (
  //       // <TabContent activeTab={activeTab} />
  //       // ) : (
  //         // <GameTracker gameState={gameState} setGameState={setGameState} endGame={endGame} />
  //     // )}
  //     //</>
  //   } else {
  //     return <GameSetup startGame={startGame} />; // Render GameSetup if game is off
  //   }
  // };

  return (
    <GameStateContext.Provider value={{ gameState, startGame, loadGame, endGame, updateScore, updatePenalty }}>
      {/* instead of setGameState eport specific functions to increase scsores, end game, etc....  */}
      {children} {/* App component */}
    </GameStateContext.Provider>
  )
}
