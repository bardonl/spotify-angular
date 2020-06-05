import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';
import {MessageService} from '../message.service';
import {Router, ActivatedRoute} from '@angular/router';
import {SpotifyService} from '../spotify.service';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService,
    private location: Location,
    private messageService: MessageService,
    private cookieService: CookieService,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code && !this.cookieService.get('access_token')) {
        this.spotify.authorize(code).subscribe(data => {
          this.cookieService.set('access_token', data['access_token'], data['expires_in']);

          this.cookieService.set('refresh_token', data['refresh_token']);
          if (this.cookieService.get('access_token')){
            console.log('Route me!');
            this.router.navigate(['/spotify-listing']);
          }
        });
      } else if (this.cookieService.get('access_token')){
        this.router.navigate(['/spotify-listing']);
      }
    });
  }

  private url = 'https://accounts.spotify.com/';
  private scopes = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  ngOnInit(): void {
  }

  private log(message: string) {
    this.messageService.add(`Login: ${message}`);
  }

  login(): void {
    const clientId = '5f4860bbf51540668c3e1f989fe9af9c';
    const clientSecret = '6a69262dc2464b6c8c0300db6b3c0a3d';
    const redirectUrl = 'http://localhost:4200';

    this.log('login');

    const accCookie = this.cookieService.get('access_token');

    if (!accCookie) {
      window.location.href =
        this.url + 'authorize?response_type=code&client_id=' + clientId +
        '&scope=' + encodeURI(this.scopes) +
        '&redirect_uri=' + redirectUrl;
    } else {
      this.router.navigate(['/spotify-listing']);
    }
  }

  private checkCookie() {

  }

  callback(): void {
    this.log('callback');
    console.log(this.route.snapshot.paramMap.get('code'));
    const code = this.route.snapshot.paramMap.get('code');
    this.log(code);
  }
}
