import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Location} from '@angular/common';
import { SpotifyService} from '../spotify.service';
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-show-playlists',
  templateUrl: './show-playlists.component.html',
  styleUrls: ['./show-playlists.component.css']
})
export class ShowPlaylistsComponent implements OnInit {
  public userPlaylistData: any | Response;
  public percentage: number;
  constructor(private location: Location, private spotify: SpotifyService, private cookie: CookieService, private router: Router) { }

  public otherUsersPlaylists;
  public  selectedPlaylist ;
  public selectedOtherPlaylist;
  public userPlaylistTracks;
  private otherUserPlaylistTracks;
  accessToken = '';

  ngOnInit(): void {
    this.accessToken = this.cookie.get('access_token');
    if (!this.accessToken){
      this.router.navigate(['']);
    } else {
      this.spotify.getPlaylists().subscribe(userPlaylistData => {
        this.userPlaylistData = userPlaylistData;
        if (this.userPlaylistData.length === 0){
          this.cookie.delete('access_token');
          this.cookie.delete('refresh_token');
          this.router.navigate(['']);
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  selectPlaylist(playlist){
    this.selectedPlaylist = playlist;
  }

  selectOtherPlaylist(playlist){
    this.selectedOtherPlaylist = playlist;
  }

  search(term: string): void {
    this.spotify.getOtherUsersPlaylists(term).subscribe( otherUsersPlaylists => {
      this.otherUsersPlaylists = otherUsersPlaylists;

      console.log(this.otherUsersPlaylists);
    });
  }

  comparePlaylists(userPlaylistId, otherUserPlaylistId){
    this.spotify.getPlaylist(userPlaylistId, 0).subscribe(userPlaylistTracks => {
      this.userPlaylistTracks = userPlaylistTracks;

      if (this.userPlaylistTracks.next){
        const pages = Math.ceil(this.userPlaylistTracks['total']/100);
        for (let i = 1; i < pages; i++) {
          this.spotify.getPlaylist(userPlaylistId,i*100).subscribe(nextTracks => {
            Array.prototype.push.apply(this.userPlaylistTracks.items, nextTracks.items);
            this.userPlaylistTracks.next = nextTracks.next;
          });
        }
      }

      this.spotify.getPlaylist(otherUserPlaylistId, 0).subscribe(otherUserPlaylistTracks => {
        this.otherUserPlaylistTracks = otherUserPlaylistTracks;

        if (this.otherUserPlaylistTracks.next){
          const pages = Math.ceil(this.otherUserPlaylistTracks['total']/100);

          for (let i = 1; i < pages; i++){
            this.spotify.getPlaylist(otherUserPlaylistId, i*100).subscribe(nextOtherTracks => {

              Array.prototype.push.apply(this.otherUserPlaylistTracks.items, nextOtherTracks.items);

              this.otherUserPlaylistTracks.next = nextOtherTracks.next;
            });
          }
        }

        const numberOfItems = this.operation(this.userPlaylistTracks.items, this.otherUserPlaylistTracks.items, true);
        const playlistLength = this.userPlaylistTracks.items.length;
        this.percentage = numberOfItems.length*100/playlistLength;

      });
    });
  }

  private operation(list1, list2, isUnion) {
    let result = [];

    for (let i = 0; i < list1.length; i++) {
      let item1 = list1[i];
      let found = false;
      for (let j = 0; j < list2.length && !found; j++){
        found = item1.track.id === list2[j].track.id;
      }
      if (found === !!isUnion) { // isUnion is coerced to boolean
        result.push(item1);
      }
    }
    return result;
  }

  private getPercentage(masterArray, compareToArray){
    const amountKeyMaster = masterArray.length;

    const compareData = Object.values(masterArray).filter(master => -1 !== compareToArray.findIndex(master)).length;

    return (amountKeyMaster / 100) * compareData;
  }
}
