import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  albumURL = 'http://localhost:3000/album';
  constructor(private http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumURL);
  }

  getAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.albumURL}/${id}`);
  }

  postAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.albumURL, album);
  }

  putAlbum(id: number, album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.albumURL}/${id}`, album);
  }

  deleteAlbum(id: number): Observable<Album> {
    return this.http.delete<Album>(`${this.albumURL}/${id}`);
  }
}
