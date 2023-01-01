import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userURL = 'api/usuario';

  constructor(private http: HttpClient) {}

  // Get
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userURL).pipe(
      first(),
      tap((res: User[]) => console.log(res))
    );
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.userURL, user).pipe(first());
  }

  putUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.userURL}/${id}`, user).pipe(first());
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.userURL}/${id}`).pipe(first());
  }
}
