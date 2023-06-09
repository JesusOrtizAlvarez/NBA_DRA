import { Component } from '@angular/core';
import { LogoResponse, Player } from '../models';
import { NbaApiService } from '../nba-api.service';

@Component({
  selector: 'app-player-favourites',
  templateUrl: './player-favourites.component.html',
  styleUrls: ['./player-favourites.component.scss']
})
export class PlayerFavouritesComponent {
  players: Player[] = [];
  escudos: LogoResponse[] = [];

  constructor(private nbaApiService: NbaApiService) {}

  ngOnInit() {
    this.nbaApiService.getAllPlayers().subscribe(players => {
      this.players = players;
    });

    this.nbaApiService.getScudos().subscribe(escudos => {
      this.escudos = escudos;
    });
  }

  getEscudo(teamId: number) {
    const escudo = this.escudos.find(escudo => escudo.teamId === teamId);
    return escudo ? escudo.url : '';
  }

  deletePlayer(playerId: number) {
    this.nbaApiService.deletePlayer(playerId).subscribe(() => {
      this.players = this.players.filter(player => player.id !== playerId);
      alert('Jugador eliminado de favoritos');
    });
  }

}
