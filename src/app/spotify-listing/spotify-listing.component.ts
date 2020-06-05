import { Component, OnInit } from '@angular/core';
import { CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import { SpotifyService} from '../spotify.service';

@Component({
  selector: 'app-spotify-listing',
  templateUrl: './spotify-listing.component.html',
  styleUrls: ['./spotify-listing.component.css']
})
export class SpotifyListingComponent implements OnInit {

  accessToken = '';
  data = [];
  constructor(private cookie: CookieService, private router: Router, private spotify: SpotifyService) { }

  ngOnInit(): void {
    this.accessToken = this.cookie.get('access_token');
    if (!this.accessToken){
      this.router.navigate(['']);
    } else {
      this.spotify.me().subscribe(data => { this.data = data; this.cookie.set('user_id', data['id']); });
    }

  }

  getPlaylists(): void {
    this.router.navigate(['show-playlists']);
  }

  createPlaylist(){
    this.router.navigate(['create-playlist']);
  }

}
