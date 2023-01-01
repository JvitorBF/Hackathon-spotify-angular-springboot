import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';

import { Music } from '../models/music';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private readonly musicURL = 'api/musica';
  constructor(private http: HttpClient) {}

  getMusics(): Observable<Music[]> {
    return this.http.get<Music[]>(this.musicURL).pipe(
      first(),
      tap((res: Music[]) => console.log(res))
    );
  }

  getMusic(id: number): Observable<Music> {
    return this.http.get<Music>(`${this.musicURL}/${id}`).pipe(first());
  }

  postMusic(music: Music): Observable<Music> {
    return this.http.post<Music>(this.musicURL, music).pipe(first());
  }

  putMusic(id: number, artist: Music): Observable<Music> {
    return this.http.put<Music>(`${this.musicURL}/${id}`, artist).pipe(first());
  }

  deleteMusic(id: number): Observable<Music> {
    return this.http.delete<Music>(`${this.musicURL}/${id}`).pipe(first());
  }
}
