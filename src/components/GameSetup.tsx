//nbrOfTeams: number;
//nbr joueurs dans l'éuipe: -> noms
// prevent from submit if not all fields set



import React, { useState, FormEvent } from 'react';
import { GameInfo } from '../types';
import { Team } from '../types'

type GameSetupProps = {
    startGame: (gameInfo: GameInfo) => void;
};

const GameSetup = ({startGame}: GameSetupProps) => {
    const [formState, setFormState] = useState<GameInfo>({
      gameName: '',
      nbrOfTeams: 0,
      teams: []
    });

    const handleGameNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({ ...prev, gameName: event.target.value }));
        console.log('form state', formState.gameName);
      };

    const handleNrbOfTeamsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newNbrOfTeams = parseInt(event.target.value) || 0;
      setFormState((prev) => {
        let newTeams = prev.teams.slice(0, newNbrOfTeams);
        while (newTeams.length < newNbrOfTeams) {
          newTeams.push({ name: '', score: 0, penalties: [false, false, false] });
        }
        return { ...prev, nbrOfTeams: newNbrOfTeams, teams: newTeams };
      });
    };

      const handleTeamNameChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedTeams = formState.teams.map((team, idx) =>
        idx === index ? { ...team, name: event.target.value } : team
    );
    setFormState(prev => ({ ...prev, teams: updatedTeams }));
      };

      const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        // Validate your form as needed
        startGame(formState);
      };


      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="gameName">Titre de la partie:</label>
            <input
              type="text"
              id="gameName"
              value={formState.gameName}
              onChange={handleGameNameChange}
            />
          </div>
          <div>
            <label htmlFor="nbrOfTeams">Combien d'équipes?</label>
            <input
              type="number"
              id="nbrOfTeams"
              value={formState.nbrOfTeams}
              onChange={handleNrbOfTeamsChange}
            />
          </div>
          {formState.nbrOfTeams && (
            formState.teams.map((team, index) => (
              <div key={index}>
                <label htmlFor={`teamName-${index}`}>Team {index + 1} Name:</label>
                <input
                  type="text"
                  id={`teamName-${index}`}
                  value={team.name}
                  onChange={handleTeamNameChange(index)}
                />
              </div>
            ))
          )}
          <button type="submit">Start Game</button>
        </form>
      );
};

const styles = {
};

export default GameSetup;
