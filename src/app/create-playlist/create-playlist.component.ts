import {Component, OnInit, Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {Location} from '@angular/common';
import { SpotifyService} from '../spotify.service';
import { Observable, Subject } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit {

  private searchedTracks = [];
  private selectedTracks = [];
  private playlistName = '';
  private playlistDescription = '';
  private trackEmbed = '';
  accessToken = '';
  private userPlaylistData: any | Response;
  constructor(
    private location: Location,
    private spotify: SpotifyService,
    private cookie: CookieService,
    private router: Router) { }

  ngOnInit(): void {
    this.accessToken = this.cookie.get('access_token');
    if (!this.accessToken){
      this.router.navigate(['']);
    } else {
      this.spotify.getPlaylists().subscribe(userPlaylistData => this.userPlaylistData = userPlaylistData);
    }
  }

  search(term: string): void {
    this.spotify.searchTracks(term).subscribe( searchedTracks => {
      this.searchedTracks = searchedTracks;

      console.log(this.searchedTracks);
    });
  }

  addTrack(track){
    this.selectedTracks.push(track);
  }

  removeTrack(track){
    this.selectedTracks.splice(this.selectedTracks.indexOf(track), 1);
  }

  save(playlistName, tracks, playlistDescription){
    this.spotify.createPlaylist(playlistName, tracks, playlistDescription).subscribe();
  }

  showPlayer(trackUri)
  {
    const urlParts = trackUri.split(':');
    this.trackEmbed = 'https://open.spotify.com/embed/' + urlParts[1] + '/' + urlParts[2];
  }

  goBack(): void {
    this.location.back();
  }
}
