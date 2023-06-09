export interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
  photo: string;
}

export interface ResultadoDia {
  home_team_score: number;
  visitor_team_score: number;
  home_team: {
    id: number;
    abbreviation: string;
    full_name: string;
    conference: string;
  };
  visitor_team: {
    id: number;
    abbreviation: string;
    full_name: string;
    conference: string;
  };
}

export interface Player {
  teamName: string;
  id: number;
  first_name: string;
  height_feet: number;
  height_inches: number;
  position: string;
  last_name: string;
  teamId: number;
  weight_pounds: number;
  points: number;
  seasons?: number[];
  photo: string;
  gamesPlayed : number;
  averagePoints : number;
}

export interface PlayerSeason {
  id: number;
  player:Player
  ast : number;
  blk : number;
  pts: number;
  reb: number;
  stl : number;
  games_played: number;
}

export interface SeasonAPI {
  id: number;
  playerId: number;
  year: string;
  team: string;
  points: number;
  assists: number;
  rebounds:number;
  steals:number;
  games:number;
}

export interface LogoResponse {
  url: any;
  teamId: number;
  imagenUrl: string;
  nombreJugador: string;
  nombreEquipo: string;
  logoUrl: string;
}
