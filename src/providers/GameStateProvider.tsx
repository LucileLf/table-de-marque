import {PropsWithChildren, createContext, useCallback, useContext, useEffect, useState} from 'react'
import { GameInfo, GameState, Team } from '../types';
import GameTracker from '../components/GameTracker';
import GameSetup from '../components/GameSetup';
import GameOver from '../components/GameOver';



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
  winningTeam: null,
  isOn: false,
};

// interface GameStateProviderProps {
//   children: React.ReactNode;
// }

type GameStateType = {
  gameState: GameState;
  startGame: (gameinfo: GameInfo) => void;
  loadGame: (stateFromBrowser: GameState) => void;
  clearGame: () => void;
  setTitle: (newTitle: string) => void;
  setTeamName: (team: Team, newTeamName: string) => void;
  updateScore: (teamIndex: number, action: 'increase' | 'decrease') => void;
  updatePenalty: (teamIndex: number, penaltyIndex: number) => void;
  endGame: () => void;
}

const GameStateContext = createContext<GameStateType | undefined>(undefined);

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};

export const saveGameInStorage = (newGameState: GameState) => {
  localStorage.setItem('gameState', JSON.stringify(newGameState));
}

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
    // localStorage.setItem('gameState', JSON.stringify(newGameState));
    saveGameInStorage(newGameState)
  }, []);

  const loadGame = useCallback((stateFromBrowser: GameState) => {
    setGameState(stateFromBrowser)
  }, [])

  const clearGame = useCallback((): void => {
    localStorage.removeItem('gameState');
    setGameState(initialGameState);
  }, []);

  const setTitle = (newTitle: string) =>  {
    setGameState((currentState) => {
      const updatedState = { ...currentState, gameName: newTitle };
      // localStorage.setItem('gameState', JSON.stringify(updatedState));
      saveGameInStorage(updatedState)
      return updatedState;
    })
  }

  const setTeamName = (teamToUpdate: Team, newTeamName: string) => {
    setGameState((currentState) => {
      const updatedTeams = currentState.teams.map((team) => {
        if (team === teamToUpdate) {
          return { ...team, name: newTeamName };
        }
        return team; // Return other teams unchanged
      });
      const updatedState = { ...currentState, teams: updatedTeams };
      // localStorage.setItem('gameState', JSON.stringify(updatedState));
      saveGameInStorage(updatedState)
      return updatedState;
    });
  };

  const updateScore = useCallback((teamIndex: number, action: 'increase' | 'decrease') => {
    setGameState((currentState) => {
      const newTeams = [...currentState.teams];
      if (action === "increase") {
        newTeams[teamIndex].score += 1;
      } else if (action === "decrease" && newTeams[teamIndex].score > 0) {
        newTeams[teamIndex].score -= 1;
      }
      const updatedState = { ...currentState, teams: newTeams };
      // localStorage.setItem('gameState', JSON.stringify(updatedState));
      saveGameInStorage(updatedState)
      return updatedState;
    });
  }, []);


  const updatePenalty = useCallback((teamIndex: number, penaltyIndex: number) => {
    setGameState((prevState) => {
      // Map through the teams to find the one to update
      const updatedTeams = prevState.teams.map((team, index) => {
        if (index === teamIndex) {
          // Toggle the specific penalty status for this team
          const updatedPenalties = prevState.teams[teamIndex].penalties.map((penalty, index) =>
            index === penaltyIndex ? !penalty : penalty
          );
          const allTrue = updatedPenalties.every((penalty) => penalty === true);
          if (allTrue) {
            // Increase opponent score
            if (teamIndex === 0) {
              updateScore(1, 'increase');
            } else if (teamIndex === 1) {
              updateScore(0, 'increase');
            }
            // Set all back to false
            const finalPenalties = updatedPenalties.map(() => false);
            return { ...team, penalties: finalPenalties };
          }
          // Return a new team object with the updated penalties array
          return { ...team, penalties: updatedPenalties };
        }
        return team; // Return other teams unchanged
      });
      const updatedState = { ...prevState, teams: updatedTeams };
      // localStorage.setItem('gameState', JSON.stringify(updatedState));
      saveGameInStorage(updatedState)
      return updatedState;
    });
  }, []);

  const endGame = () =>  {
    setGameState((prevState) => {
      const teams = gameState.teams;
      const maxScore = Math.max(...teams.map(team=>team.score));
      const winningTeam = teams.find(team => team.score === maxScore);
      console.log('winningTeam', winningTeam);
      const updatedState: GameState = {
        ...prevState,
        winningTeam: winningTeam || null, // Adjusting for type inconsistency
        // isOn: false
      };
      saveGameInStorage(updatedState)
      return updatedState;
      // return winningTeam;
    })
    // return <GameOver winningTeam={gameState.winningTeam} />
  }

  // const renderChildren = () => {
  //   if (gameState.isOn) {
  //     return <GameTracker gameState={gameState} setGameState={setGameState} clearGame={clearGame}/>; // Render GameTracker if game is on
  //     //<>
  //     // <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
  //     // {activeTab ? (
  //       // <TabContent activeTab={activeTab} />
  //       // ) : (
  //         // <GameTracker gameState={gameState} setGameState={setGameState} clearGame={clearGame} />
  //     // )}
  //     //</>
  //   } else {
  //     return <GameSetup startGame={startGame} />; // Render GameSetup if game is off
  //   }
  // };

  return (
    <GameStateContext.Provider value={{ gameState, startGame, loadGame, clearGame, setTitle, setTeamName, updateScore, updatePenalty, endGame }}>
      {/* instead of setGameState eport specific functions to increase scsores, end game, etc....  */}
      {children} {/* App component */}
    </GameStateContext.Provider>
  )
};
