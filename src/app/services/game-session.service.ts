import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameSession} from '../classes/game-session';

@Injectable({
  providedIn: 'root'
})
export class GameSessionService {
  private apiUrl = 'http://localhost:5037/gameSessions';

  constructor(private http: HttpClient) { }

  getAllGameSessions(): Observable<GameSession[]> {
    return this.http.get<GameSession[]>(this.apiUrl);
  }
}
