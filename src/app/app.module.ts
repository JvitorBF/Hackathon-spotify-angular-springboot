import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArtistaComponent } from './view/artista/artista.component';
import { AlbumComponent } from './view/album/album.component';
import { MusicaComponent } from './view/musica/musica.component';
import { MatMenuModule } from '@angular/material/menu';
import { MenuComponent } from './components/header/menu/menu.component';
import { ArtistDialogComponent } from './components/artist-dialog/artist-dialog.component';
import { AlbumDialogComponent } from './components/album-dialog/album-dialog.component';
import { MusicDialogComponent } from './components/music-dialog/music-dialog.component';
import { PlaylistDialogComponent } from './components/playlist-dialog/playlist-dialog.component';
import { PlaylistComponent } from './view/playlist/playlist.component';
import { PlaylistDialogMusicComponent } from './components/playlist-dialog-music/playlist-dialog-music.component';
import { ArtistDialogAlbumComponent } from './components/artist-dialog-album/artist-dialog-album.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    UserDialogComponent,
    ArtistaComponent,
    AlbumComponent,
    MusicaComponent,
    MenuComponent,
    PlaylistComponent,
    ArtistDialogComponent,
    AlbumDialogComponent,
    MusicDialogComponent,
    PlaylistDialogComponent,
    PlaylistDialogMusicComponent,
    ArtistDialogAlbumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
