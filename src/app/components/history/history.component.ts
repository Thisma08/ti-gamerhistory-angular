import {Component, OnInit} from '@angular/core';
import {GameSession} from '../../classes/game-session';
import {GameSessionService} from '../../services/game-session.service';
import {UserCreateComponent} from '../user-create/user-create.component';
import {DatePipe, NgClass} from '@angular/common';
import {Game} from '../../classes/game';
import {VideogameService} from '../../services/videogame.service';
import {User} from '../../classes/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    UserCreateComponent,
    NgClass,
    DatePipe
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  gameSessions: GameSession[] = [];
  games: Game[] = [];
  users: User[] = [];
  groupedSessions: { date: string; sessions: GameSession[] }[] = [];
  loading = true;

  constructor(
    private gameSessionService: GameSessionService,
    private videogameService: VideogameService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadGameSessions();
    this.loadGames();
    this.loadUsers();
  }

  loadGameSessions(): void {
    this.gameSessionService.getAllGameSessions().subscribe(
      (data: GameSession[]) => {
        this.gameSessions = data;
        this.groupAndSortSessions();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching game sessions:', error);
        this.loading = false;
      }
    );
  }

  loadGames(): void {
    this.videogameService.getAllGames().subscribe(
      (data: Game[]) => {
        this.games = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching games:', error);
        this.loading = false;
      }
    );
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.loading = false;
      }
    );
  }

  groupAndSortSessions(): void {
    const grouped = this.gameSessions.reduce((acc, session) => {
      const date = new Date(session.sessionDateTime).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(session);
      return acc;
    }, {} as { [key: string]: GameSession[] });

    this.groupedSessions = Object.entries(grouped)
      .map(([date, sessions]) => ({ date, sessions }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  getGameNameById(gameId: number): string {
    const game = this.games.find(g => g.id === gameId);
    return game ? game.name : 'Unknown';
  }

  getUserNameById(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.pseudo : 'Unknown';
  }

  getGameProgressPercentage(gameId: number | undefined): number {
    const totalMinutesPlayed = this.gameSessions
      .filter(session => session.gameId === gameId)
      .reduce((acc, session) => acc + session.gameTimeMin, 0);

    const game = this.games.find(g => g.id === gameId);
    if (!game || game.minutesForCompletion === 0) {
      return 0;
    }

    const percentage = (totalMinutesPlayed / game.minutesForCompletion) * 100;
    return Math.min(percentage, 100);
  }
}
