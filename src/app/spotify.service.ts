import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import { Headers } from '@angular/http';
import {MessageService} from './message.service';
import {catchError, map, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {toBase64String} from '@angular/compiler/src/output/source_map';
import {Observable, of} from 'rxjs';
import { CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private messageService: MessageService,
    private cookie: CookieService) {

  }

  private url = 'https://accounts.spotify.com/';
  private apiUrl = 'https://api.spotify.com/';
  private clientId = '5f4860bbf51540668c3e1f989fe9af9c';
  private clientSecret = '6a69262dc2464b6c8c0300db6b3c0a3d';
  private scopes = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  private log(message: string) {
    this.messageService.add(`Spotify Service: ${message}`);

  }

  login() {

    const redirectUrl = 'http://localhost:4200/callback';
    this.log('login');

    const response = this.http.get(
      this.url + '/authorize?response_type=code&client_id=' + this.clientId +
      '&scope=' + encodeURI(this.scopes) +
      '&redirect_uri=' + redirectUrl).pipe(
      tap(_ => this.log(this.route.snapshot.paramMap.get('code')))
    );

    console.log(response);
  }


  authorize(code) {

    const bodyParams = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:4200'
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
      }),
      params: bodyParams
    };
    // return this.http.request('POST', this.url + 'api/token', httpOptions);
    return this.http.post(this.url + 'api/token', '', httpOptions)
      .pipe(
      map((res: Response) => {
        return res;
      }),
      tap(_ => this.log('??')),
      catchError(this.handleError<any[]>('tokens', []))
    );

  }

  me() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.cookie.get('access_token'));

    return this.http.get(this.apiUrl + 'v1/me', { headers })
      .pipe(
        map((res: Response) => {
          return res;
        }),
        catchError(this.handleError<any[]>('tokens', []))
      );
  }

  getPlaylists() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.cookie.get('access_token'));

    return this.http.get(this.apiUrl + 'v1/me/playlists', { headers })
      .pipe(
        map((res: Response) => {
          return res;
        }),
        catchError(this.handleError<any[]>('tokens', []))
      );
  }

  searchTracks(params) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.cookie.get('access_token'));

    return this.http.get(this.apiUrl + 'v1/search?q=' + encodeURI(params) + '&type=track', { headers })
      .pipe(
        map((res: Response) => {

          return res;
        }),
        catchError(this.handleError<any[]>('tokens', []))
      );
  }

  createPlaylist(playlistName, tracks, playlistDescription) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.cookie.get('access_token'));

    const data = {
      'name': playlistName,
      'description': playlistDescription,
      'public': 'false'
    };

    return this.http.post(this.apiUrl + 'v1/users/' + this.cookie.get('user_id') + '/playlists', data, { headers })
      .pipe(
        map((res: Response) => {
          this.addTracksToPlaylist(res, tracks).subscribe();
          console.log(res);
          return res;
        }),
        catchError(this.handleError<any[]>('tokens', []))
      );


  }

  addTracksToPlaylist(playlist, tracks){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.cookie.get('access_token'));

    let uri = '';

    const lastItem = tracks.pop();
    for (let track of tracks){
      uri = uri + track['uri'] + ',';
    }
    uri = uri + lastItem['uri'];

    return this.http.post(this.apiUrl + 'v1/playlists/' + playlist['id'] + '/tracks?uris=' + encodeURI(uri), '', { headers })
      .pipe(
        map((res: Response) => {
          return res;
        }),
        catchError(this.handleError<any[]>('tokens', []))
      );
  }

  public getOtherUsersPlaylists(userId){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.cookie.get('access_token'));

    return this.http.get(this.apiUrl + 'v1/users/'+userId+'/playlists', { headers })
      .pipe(
        map((res: Response) => {
          console.log(res);
          return res;
        }),
        catchError(this.handleError<any[]>('tokens', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<any> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
