import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerFavouritesComponent } from './player-favourites.component';

describe('PlayerFavouritesComponent', () => {
  let component: PlayerFavouritesComponent;
  let fixture: ComponentFixture<PlayerFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerFavouritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
