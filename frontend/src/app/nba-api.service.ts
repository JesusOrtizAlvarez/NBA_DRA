import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team, ResultadoDia, Player, LogoResponse, PlayerSeason } from './models';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NbaApiService {

  private apiUrl = 'https://www.balldontlie.io/api/v1/';

  private url = 'http://localhost:8081/api/';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    const url = `${this.apiUrl}teams`;
    return this.http.get(url).pipe(
      map((response: any) => response.data)
    );
  }

  getTeam(teamId: number): Observable<Team> {
    const url = `${this.apiUrl}teams/${teamId}`;
    return this.http.get<Team>(url).pipe(
      map((response: any) => response)
    );
  }

  getResultadosDelDia(): Observable<ResultadoDia[]> {
    const url = `${this.apiUrl}games`;

    const fechaActual = new Date();
    const fechaActualStr = `${fechaActual.getFullYear()}-${fechaActual.getMonth() + 1}-${fechaActual.getDate()}`;

    return this.http.get<ResultadoDia[]>(url, { params: { 'start_date': fechaActualStr, 'end_date': fechaActualStr } });
  }

  getTeamsByConference(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/teams`);
  }

  getPlayerStatistics(playerId: number): Observable<any> {
    const url = `${this.apiUrl}players/${playerId}`;
    return this.http.get(url);
  }


  getSeasonStats(year: number) {
    const url = `${this.apiUrl}stats?seasons[]=${year}`;
    return this.http.get(url);
  }

  searchPlayersByName(name: string) {
    const url = `${this.apiUrl}players?search=${name}`;
    return this.http.get(url);
  }

  getPlayerSeasons(year: number, playerId: number) {
    const url = `${this.apiUrl}season_averages?season=${year}&player_ids[]=${playerId}`;
    return this.http.get<PlayerSeason[]>(url);
  }

  getScudos() {
    const url = `${this.url}logo/data`;
    return this.http.get<LogoResponse[]>(url);
  }

  getImagesPlayer() {
    const url = `${this.url}logo/data2`;
    return this.http.get<LogoResponse[]>(url);
  }

  getPageStats(season: number, queryParams: any) {
    const url = `${this.apiUrl}stats/?seasons[]=${season}&per_page=${queryParams.per_page}&page=${queryParams.page}`;
    console.log(url);
    return this.http.get(url);
  }

  savePlayer(player: Player) {
    return this.http.post(this.url + 'players', player);
  }

  getAllPlayers() {
    return this.http.get<Player[]>(this.url + 'players');
  }

  deletePlayer(id: number) {
    return this.http.delete(this.url + 'players/' + id);
  }
}
