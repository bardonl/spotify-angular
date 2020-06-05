import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlaylistsComponent } from './show-playlists.component';

describe('ShowPlaylistsComponent', () => {
  let component: ShowPlaylistsComponent;
  let fixture: ComponentFixture<ShowPlaylistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPlaylistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
