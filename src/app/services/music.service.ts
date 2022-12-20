import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Music } from '../models/music';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  musicURL = 'http://localhost:3000/music';
  constructor(private http: HttpClient) {}

  getMusics(): Observable<Music[]> {
    return this.http.get<Music[]>(this.musicURL);
  }

  getMusic(id: number): Observable<Music> {
    return this.http.get<Music>(`${this.musicURL}/${id}`);
  }

  postMusic(music: Music): Observable<Music> {
    return this.http.post<Music>(this.musicURL, music);
  }

  putMusic(id: number, artist: Music): Observable<Music> {
    return this.http.put<Music>(`${this.musicURL}/${id}`, artist);
  }

  deleteMusic(id: number): Observable<Music> {
    return this.http.delete<Music>(`${this.musicURL}/${id}`);
  }
}
