import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {MessageService} from '../message.service';
import {Router, ActivatedRoute} from '@angular/router';
import {SpotifyService} from '../spotify.service';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../environments/environment';

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
          const expire = new Date();
          const time = Date.now() + ((3600 * 1000) * 3);
          expire.setTime(time);

          this.cookieService.set('access_token', data['access_token'], expire);

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

    this.log('login');

    const accCookie = this.cookieService.get('access_token');

    if (!accCookie) {
      window.location.href =
        environment.url + 'authorize?response_type=code&client_id=' + environment.clientId +
        '&scope=' + encodeURI(this.scopes) +
        '&redirect_uri=' + environment.redirectUrl;
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
