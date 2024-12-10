import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from '../classes/game';

@Injectable({
  providedIn: 'root'
})
export class VideogameService {
  private apiUrl = 'http://localhost:5037/games';

  constructor(private http: HttpClient) { }

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  createGame(game: Game): Observable<Game> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Game>(this.apiUrl, game, httpOptions);
  }
}
