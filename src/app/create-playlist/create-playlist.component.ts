import {Component, OnInit, Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {Location} from '@angular/common';
import { SpotifyService} from '../spotify.service';
import { Observable, Subject } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

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
  private searchTerms = new Subject<string>();
  private searchedTracks = [];
  private selectedTracks = [];
  private playlistName = '';
  private playlistDescription = '';
  private trackEmbed = '';
  constructor(
    private location: Location,
    private spotify: SpotifyService) { }

  ngOnInit(): void {
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
    this.spotify.createPlaylist(playlistName,tracks, playlistDescription).subscribe();
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
