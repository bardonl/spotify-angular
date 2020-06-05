import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Location} from '@angular/common';
import { SpotifyService} from '../spotify.service';
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-show-playlists',
  templateUrl: './show-playlists.component.html',
  styleUrls: ['./show-playlists.component.css']
})
export class ShowPlaylistsComponent implements OnInit {
  constructor(private location: Location, private spotify: SpotifyService) { }

  private searchTerms = new Subject<string>();
  private otherUsersPlaylists = [];
  private selectedPlaylist = [];

  ngOnInit(): void {
    this.spotify.getPlaylists().subscribe(userPlaylistData => this.userPlaylistData = userPlaylistData);

    this.otherUsersPlaylists = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.spotify.getOtherUsersPlaylists(term)),
    );
  }

  goBack(): void {
    this.location.back();
  }

  selectPlaylist(playlist){
    this.selectedPlaylist = playlist;
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
