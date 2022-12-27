import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  artistURL = 'http://localhost:3000/artist';

  constructor(private http: HttpClient) {}

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.artistURL);
  }

  postArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.artistURL, artist);
  }

  putArtist(id: number, artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.artistURL}/${id}`, artist);
  }

  putArtistAlbum(idArtist: number, artist: Artist | undefined) {
    return this.http.put<Artist>(`${this.artistURL}/${idArtist}`, artist);
  }

  deleteArtist(id: number): Observable<Artist> {
    return this.http.delete<Artist>(`${this.artistURL}/${id}`);
  }
}

/*
    public data: Artist,
 */
