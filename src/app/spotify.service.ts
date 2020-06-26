import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
import {catchError, map, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import { CookieService} from 'ngx-cookie-service';
import { environment } from './../environments/environment';

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

  private log(message: string) {
    this.messageService.add(`Spotify Service: ${message}`);

  }

  authorize(code) {

    const bodyParams = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: environment.redirectUrl
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(environment.clientId + ':' + environment.clientSecret)
      }),
      params: bodyParams
    };

    return this.http.post(environment.url + 'api/token', '', httpOptions)
      .pipe(
      map((res: Response) => {
        return res;
      }),
      catchError(this.handleError<any[]>('tokens', []))
    );

  }

  me() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.cookie.get('access_token'));

    return this.http.get(environment.apiUrl + 'v1/me', { headers })
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

    return this.http.get(environment.apiUrl + 'v1/me/playlists', { headers })
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

    return this.http.get(environment.apiUrl + 'v1/search?q=' + encodeURI(params) + '&type=track', { headers })
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

    return this.http.post(environment.apiUrl + 'v1/users/' + this.cookie.get('user_id') + '/playlists', data, { headers })
      .pipe(
        map((res: Response) => {
          this.addTracksToPlaylist(res, tracks).subscribe();
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

    return this.http.post(environment.apiUrl + 'v1/playlists/' + playlist['id'] + '/tracks?uris=' + encodeURI(uri), '', { headers })
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

    return this.http.get(environment.apiUrl + 'v1/users/'+userId+'/playlists', { headers })
      .pipe(
        map((res: Response) => {
          return res;
        }),
        catchError(this.handleError<any[]>('tokens', []))
      );
  }

  getPlaylist(playlistId, offset) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.cookie.get('access_token'));

    let endPart = '/tracks';

    if (offset){
      endPart = endPart + '?offset=' + offset;
    }

    console.log(endPart);

    return this.http.get(environment.apiUrl + 'v1/playlists/' + playlistId + endPart, { headers })
      .pipe(
        map((res: Response) => {
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
