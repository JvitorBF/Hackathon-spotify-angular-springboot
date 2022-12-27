import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumComponent } from './view/album/album.component';
import { ArtistaComponent } from './view/artista/artista.component';
import { HomeComponent } from './view/home/home.component';
import { MusicaComponent } from './view/musica/musica.component';
import { PlaylistComponent } from './view/playlist/playlist.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'artista',
    component: ArtistaComponent,
  },
  {
    path: 'album',
    component: AlbumComponent,
  },
  {
    path: 'musica',
    component: MusicaComponent,
  },
  {
    path: 'playlist',
    component: PlaylistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
