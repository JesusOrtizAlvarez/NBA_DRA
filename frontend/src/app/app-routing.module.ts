import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PlayerComponent } from './player/player.component';
import  { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayerFavouritesComponent } from './player-favourites/player-favourites.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'players', component: PlayerComponent},
  { path: 'teams', component: TeamComponent},
  { path: 'players/:id', component: PlayerDetailComponent},
  { path: 'favourites', component: PlayerFavouritesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
