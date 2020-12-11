import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowPlaylistsComponent } from './show-playlists.component';

describe('ShowPlaylistsComponent', () => {
  let component: ShowPlaylistsComponent;
  let fixture: ComponentFixture<ShowPlaylistsComponent>;

  beforeEach(waitForAsync(() => {
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
