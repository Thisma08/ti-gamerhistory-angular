import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {delay, Observable, of} from 'rxjs';
import {User} from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5037/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
/*
    const mockUsers: User[] = [
      { id: 1, pseudo: 'JohnDoe', email: 'john@example.com', password: 'password', role: 'Admin' },
      { id: 2, pseudo: 'JaneDoe', email: 'jane@example.com', password: 'password', role: 'User' },
    ];

    return of(mockUsers).pipe(delay(3000));
*/
  }

  createUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<User>(this.apiUrl, user, httpOptions);
  }
}
