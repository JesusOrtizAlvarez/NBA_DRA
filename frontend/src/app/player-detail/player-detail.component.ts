import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbaApiService } from '../nba-api.service';
import { LogoResponse, Player, PlayerSeason, Team } from '../models';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {
  playerId!: number;
  player!: Player;
  team!: Team;
  seasons !: number;
  playerSeasons : PlayerSeason[] = [];
  availableYears: number[] = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
  selectedYear!: number;
  escudosEquipos: LogoResponse[] = [];
  playerLog!: PlayerSeason;

  totalpts = 0;
  totalast = 0;
  totalblk = 0;
  totalreb = 0;
  totalstl = 0;
  totalgames_played = 0;
  teamLogo: string = ''; // Almacena la URL del logotipo del equipo
  playerImage: string = ''; // Almacena la URL de la imagen del jugador


  constructor(
    private route: ActivatedRoute,
    private nbaApiService: NbaApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const playerId = Number(params.get('id'));
      if (!isNaN(playerId)) {
        this.playerId = playerId;
        this.getPlayerDetails(this.playerId);

      } else {
        // Manejar el caso en el que el ID del jugador no sea un número válido
        console.log('El ID del jugador no es válido');
      }
    });

    this.selectedYear = this.availableYears[this.availableYears.length - 1]; // Establecer el año predeterminado
    this.getPlayerSeasons(this.playerId);
  }

  getPlayerDetails(playerId: number) {
    console.log('getPlayerDetails() called. Player ID:', playerId);
    this.nbaApiService.getPlayerStatistics(playerId).subscribe((player: Player) => {
      this.player = player;


      // Asignar el equipo del jugador a this.team
      this.getPlayerImage(); // Obtener la imagen del jugador
    });
  }


  getPlayerSeasons(playerId: number) {
    this.nbaApiService.getPlayerSeasons(this.selectedYear, playerId).subscribe((response: any) => {
      const playerSeasons: PlayerSeason[] = response.data;
      this.playerSeasons = playerSeasons;

      this.totalpts = playerSeasons.reduce((total, season) => total + season.pts, 0);
      this.totalast = playerSeasons.reduce((total, season) => total + season.ast, 0);
      this.totalblk = playerSeasons.reduce((total, season) => total + season.blk, 0);
      this.totalreb = playerSeasons.reduce((total, season) => total + season.reb, 0);
      this.totalstl = playerSeasons.reduce((total, season) => total + season.stl, 0);
      this.totalgames_played = playerSeasons.reduce((total, season) => total + season.games_played, 0);

    });
  }

  onYearChange() {
    this.getPlayerSeasons(this.playerId);
  }

  getPlayerImage() {
    this.nbaApiService.getImagesPlayer().subscribe((images: LogoResponse[]) => {
      const playerName = this.player.first_name.toLowerCase() + ' ' + this.player.last_name.toLowerCase(); // Obtén el nombre completo del jugador
      const image = images.find(image => image.nombreJugador.toLowerCase().replace(' headshot', '') === playerName);

      if (image) {
        this.player.photo = image.imagenUrl

      }
    });
  }

  savePlayer(player: Player) {
    this.nbaApiService.savePlayer(player).subscribe(() => {
      alert('Jugador añadido a favoritos');
    });
  }
}

