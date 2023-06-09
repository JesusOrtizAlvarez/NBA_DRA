import { Component, OnInit } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { LogoResponse } from '../models';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  conferences!: any[];
  logoData: any[] = [];

  constructor(private nbaApiService: NbaApiService) {}


  ngOnInit(): void {
    this.nbaApiService.getTeamsByConference()
      .subscribe(response => {
        this.conferences = this.groupTeamsByConference(response.data);
        this.getTeamLogos();
      }, error => {
        console.log(error);
      });
  }

  getTeamLogos() {
    this.nbaApiService.getScudos().subscribe(
      (response: LogoResponse[]) => {
        this.logoData = response;
        this.conferences.forEach(conference => {
          conference.teams.forEach((team: { full_name: any; photo: any; }) => {
            const logo = this.logoData.find(data => team.full_name.toLowerCase() === data.nombreEquipo.toLowerCase().replace(' logo', ''));
            if (logo) {
              team.photo = logo.logoUrl;
            }
          });
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }



  groupTeamsByConference(teams: any[]): any[] {
    const conferences: any[] = [];

    teams.forEach(team => {
      const conference = conferences.find(c => c.name === team.conference);
      if (conference) {
        conference.teams.push(team);
      } else {
        conferences.push({ name: team.conference, teams: [team] });
      }
    });

    return conferences;
  }

}
