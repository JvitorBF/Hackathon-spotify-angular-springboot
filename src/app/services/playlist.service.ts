import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Music } from '../models/music';
import { Playlist } from '../models/playlist';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  playlistURL = 'http://localhost:3000/playlist';
  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.playlistURL);
  }

  postPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(this.playlistURL, playlist);
  }

  putPlaylist(id: number, playlist: Playlist): Observable<Playlist> {
    return this.http.put<Playlist>(`${this.playlistURL}/${id}`, playlist);
  }

  putPlaylistMusic(idPlaylist: number, playlist: Playlist | undefined) {
    return this.http.put<Playlist>(`${this.playlistURL}/${idPlaylist}`, playlist );
  }

  deletePlaylist(id: number): Observable<Playlist> {
    return this.http.delete<Playlist>(`${this.playlistURL}/${id}`);
  }
}
