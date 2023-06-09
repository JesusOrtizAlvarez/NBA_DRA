import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultadoDia, Team } from '../models';
import { NbaApiService } from '../nba-api.service';
import { LogoResponse } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  resultadosDelDia: ResultadoDia[] = [];
  escudosEquipos: LogoResponse[] = [];
  fechaActual: Date = new Date();
  fechaActualStr: string = '';
  displayedColumns: string[] = ['localTeam', 'localScore', 'visitTeam', 'visitScore', 'conference'];

  constructor(private http: HttpClient, private nbaService: NbaApiService) {}

  ngOnInit() {
    this.obtenerFechaISO();
    this.obtenerResultadosDelDia();
    this.obtenerEscudosEquipos();
  }

  obtenerFechaISO() {
    const mes = this.fechaActual.getMonth() + 1;
    const dia = this.fechaActual.getDate();
    this.fechaActualStr = `${this.fechaActual.getFullYear()}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
  }

  obtenerResultadosDelDia() {
    const url = `https://www.balldontlie.io/api/v1/games?start_date=${this.fechaActualStr}&end_date=${this.fechaActualStr}`;
    this.http.get<any>(url).subscribe(response => {
      this.resultadosDelDia = response.data;
      console.log(this.resultadosDelDia);
    });
  }

  obtenerEscudosEquipos() {
    this.nbaService.getScudos().subscribe(response => {
      this.escudosEquipos = response;
      console.log(this.escudosEquipos);
    });
  }

  cambiarDia(dias: number) {
    this.fechaActual.setDate(this.fechaActual.getDate() + dias);
    this.obtenerFechaISO();
    this.obtenerResultadosDelDia();
  }

  getLogoUrl(teamName: string): string {
    const equipo = this.escudosEquipos.find(escudo =>
      escudo.nombreEquipo.toLowerCase().includes(teamName.toLowerCase())
    );
    if (equipo) {
      const logoUrl = equipo.logoUrl;
      const logoUrlWithoutLogo = logoUrl.replace(' Logo', '');
      return logoUrlWithoutLogo;
    }
    return '';
  }

}
