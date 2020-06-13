import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent} from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule, Routes } from '@angular/router';
import { SpotifyListingComponent } from './spotify-listing/spotify-listing.component';
import { CreatePlaylistComponent, SafePipe  } from './create-playlist/create-playlist.component';
import { ShowPlaylistsComponent } from './show-playlists/show-playlists.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessagesComponent,
    SpotifyListingComponent,
    CreatePlaylistComponent,
    ShowPlaylistsComponent,
    SafePipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([{
      path: '',
      component: AppComponent
    },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
