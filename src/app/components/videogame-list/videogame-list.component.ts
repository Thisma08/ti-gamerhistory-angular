import {Component, OnInit} from '@angular/core';
import {Game} from '../../classes/game';
import {VideogameService} from '../../services/videogame.service';
import {UserCreateComponent} from '../user-create/user-create.component';
import {NgClass} from '@angular/common';
import {VideogameCreateComponent} from '../videogame-create/videogame-create.component';
import {Support} from '../../classes/support';
import {SupportService} from '../../services/support.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-videogame-list',
  standalone: true,
  imports: [
    UserCreateComponent,
    NgClass,
    VideogameCreateComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './videogame-list.component.html',
  styleUrl: './videogame-list.component.css'
})
export class VideogameListComponent implements OnInit {
  games: Game[] = [];
  supports: Support[] = [];
  loading = true;

  selectedSupport: number | null = null;
  showCreateForm: boolean = false; // Controls the visibility of the modal

  constructor(
    private videogameService: VideogameService,
    private supportService: SupportService
  ) {}

  ngOnInit(): void {
    this.loadGames();
    this.loadSupports();
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

  loadSupports(): void {
    this.supportService.getAllSupports().subscribe(
      (data: Support[]) => {
        this.supports = data;
      },
      (error) => {
        console.error('Error fetching supports:', error);
      }
    );
  }

  getSupportNameById(supportId: number): string {
    const support = this.supports.find(s => s.id === supportId);
    return support ? support.name : 'Unknown';
  }

  onCreatedGame(newGame: Game): void {
    this.games = [...this.games, newGame];
    this.toggleCreateForm(); // Close the modal after creating a game
  }

  get filteredGames(): Game[] {
    if (!this.selectedSupport) {
      return this.games;
    }
    const selectedSupportId = Number(this.selectedSupport);
    return this.games.filter(game => game.supportId === selectedSupportId);
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }
}
