import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';

import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private readonly artistURL = 'api/artista';

  constructor(private http: HttpClient) {}

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.artistURL).pipe(
      first(),
      tap((res: Artist[]) => console.log(res))
    );
  }

  postArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.artistURL, artist).pipe(first());
  }

  putArtist(id: number, artist: Artist): Observable<Artist> {
    return this.http
      .put<Artist>(`${this.artistURL}/${id}`, artist)
      .pipe(first());
  }

  putArtistAlbum(idArtist: number, idAlbum: number) {
    return this.http
      .put<Artist>(
        `${this.artistURL}/?artistaId=${idArtist}&albumId=${idAlbum}`,
        null
      )
      .pipe(first());
  }

  deleteArtist(id: number): Observable<Artist> {
    return this.http.delete<Artist>(`${this.artistURL}/${id}`).pipe(first());
  }
}
