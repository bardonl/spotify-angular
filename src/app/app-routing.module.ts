import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpotifyService} from './spotify.service';
import {LoginComponent} from './login/login.component';
import {SpotifyListingComponent} from './spotify-listing/spotify-listing.component';
import {CreatePlaylistComponent} from './create-playlist/create-playlist.component';
import {ShowPlaylistsComponent} from './show-playlists/show-playlists.component';

const routes: Routes = [
  {path: 'callback?code=', component: LoginComponent},
  {path: 'spotify-listing', component: SpotifyListingComponent},
  {path: 'create-playlist', component: CreatePlaylistComponent},
  {path: 'show-playlists', component: ShowPlaylistsComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
