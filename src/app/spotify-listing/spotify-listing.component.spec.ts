import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyListingComponent } from './spotify-listing.component';

describe('SpotifyListingComponent', () => {
  let component: SpotifyListingComponent;
  let fixture: ComponentFixture<SpotifyListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifyListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
