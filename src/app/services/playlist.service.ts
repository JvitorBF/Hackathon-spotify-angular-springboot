import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';

import { Playlist } from '../models/playlist';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private readonly playlistURL = 'api/playlist';
  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.playlistURL).pipe(
      first(),
      tap((res: Playlist[]) => console.log(res))
    );
  }

  postPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(this.playlistURL, playlist).pipe(first());
  }

  putPlaylist(id: number, playlist: Playlist): Observable<Playlist> {
    return this.http
      .put<Playlist>(`${this.playlistURL}/${id}`, playlist)
      .pipe(first());
  }

  putPlaylistMusic(idPlaylist: number, idAlbum: number) {
    return this.http
      .put<Playlist>(
        `${this.playlistURL}/?playlistId=${idPlaylist}&musicaId=${idAlbum}`,
        null
      )
      .pipe(first());
  }

  deletePlaylist(id: number): Observable<Playlist> {
    return this.http
      .delete<Playlist>(`${this.playlistURL}/${id}`)
      .pipe(first());
  }
}
