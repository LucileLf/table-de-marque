export type Team = {
    name: string,
    // nbr_players: number,
    score: number,
    penalties: boolean[],
}

export type GameInfo = {
    gameName: string;
    nbrOfTeams: number;
    teams: Team[];
    winningTeam: Team |  null
};


export interface GameState extends GameInfo {
  isOn: boolean;
}
