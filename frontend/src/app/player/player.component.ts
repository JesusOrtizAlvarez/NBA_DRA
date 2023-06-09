import { Component, OnInit } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { Player, Team } from '../models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  season: number;
  searchTerm!: string;
  topPlayers: Player[] = [];
  teams: Team[] = [];
  years: number[] = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
  noResults: boolean = false;
  allPlayers: Player[] = [];
  displayedPlayers: Player[] = [];



  constructor(private nbaApiService: NbaApiService, private router: Router) {
    this.season = this.years[this.years.length - 1];
  }

  ngOnInit() {
    this.getPlayersByPage(1);
    this.getTeams();
  }

  getPlayersByPage(page: number) {
    const queryParams = {
    per_page: 25,
    page: page
    };
    if (page <= 20) {
    this.nbaApiService.getPageStats(this.season, queryParams).subscribe((response: any) => {
    const playersData = response?.data;

    const playerStatsMap = new Map<number, { totalPoints: number, gamesPlayed: number }>();


    playersData.forEach((player: any) => {
    const playerId = player.player.id;
    const points = player.pts;

    if (playerStatsMap.has(playerId)) {

    const playerStats = playerStatsMap.get(playerId)!;
    playerStats.totalPoints += points;
    playerStats.gamesPlayed++;
    } else {

    playerStatsMap.set(playerId, { totalPoints: points, gamesPlayed: 1 });
    }
    });


    this.topPlayers = Array.from(playerStatsMap.entries()).map(([playerId, playerStats]) => {
    const playerData = playersData.find((player: any) => player.player.id === playerId);
    const player: Player = {
      id: playerId,
      first_name: playerData.player.first_name,
      last_name: playerData.player.last_name,
      height_feet: playerData.player.height_feet,
      height_inches: playerData.player.height_inches,
      position: playerData.player.position,
      teamId: playerData.player.team_id,
      weight_pounds: playerData.player.weight_pounds,
      points: playerStats.totalPoints,
      gamesPlayed: playerStats.gamesPlayed,
      averagePoints: playerStats.totalPoints / playerStats.gamesPlayed,
      photo: '',
      teamName: ''
    };
    return player;
    });


    this.allPlayers.push(...this.topPlayers);

    const meta = response?.meta;

    if (meta && meta.next_page) {

    this.getPlayersByPage(meta.next_page);
    } else {

    this.noResults = this.topPlayers.length === 0;
    }
    });
    } else {
      this.displayedPlayers  = this.allPlayers.sort((a, b) => b.points - a.points).slice(0, 20);
    }
   }

  getTeams() {
    this.nbaApiService.getTeams().subscribe((teams: Team[]) => {
      this.teams = teams;
    });
  }

  getTeamName(teamId: number): string {
    const team = this.teams.find((team) => team.id === teamId);
    return team ? team.name : '';
  }

  onChangeSeason(event: any) {
    this.season = parseInt(event.target.value);
    this.allPlayers = [];
    this.getPlayersByPage(0);
  }

  onSearch() {
    if (this.searchTerm) {
    this.nbaApiService.searchPlayersByName(this.searchTerm).subscribe((response: any) => {
    const playersData = response?.data;


    this.displayedPlayers = playersData.map((player: { first_name: any; last_name: any; id: any; teamId: any}) => {
    const playerObj: Player = {
      id: player.id,
      first_name: player.first_name,
      last_name: player.last_name,
      height_feet: -1,
      height_inches: -1,
      position: '',
      teamId: player.teamId,
      weight_pounds: -1,
      points: 0,
      photo: '',
      gamesPlayed: 0,
      averagePoints: 0,
      teamName: ''
    };
    return playerObj;
    });

    this.noResults = this.displayedPlayers.length === 0;
    });
    } else {
    this.getPlayersByPage(0);
    }
   }

  resetSearch() {
    this.searchTerm = '';
    this.getPlayersByPage(0);
  }

  viewPlayerDetails(playerId: number) {
    this.router.navigate(['/players', playerId]);
  }
}
