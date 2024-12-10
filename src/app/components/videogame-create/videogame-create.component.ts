import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Game} from '../../classes/game';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {VideogameService} from '../../services/videogame.service';
import {SupportService} from '../../services/support.service';
import {Support} from '../../classes/support';

@Component({
  selector: 'app-videogame-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './videogame-create.component.html',
  styleUrl: './videogame-create.component.css'
})
export class VideogameCreateComponent implements OnInit {
  createGameForm: FormGroup;

  @Output() createdGame = new EventEmitter<Game>();

  game: Game = {
    name: '',
    minutesForCompletion: 0,
    supportId: 0
  }

  supports: Support[] = [];
  loading: boolean = true;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private videogameService: VideogameService,
    private supportService: SupportService,
    private fb: FormBuilder
  ) {
    this.createGameForm = this.fb.group({
      name: [this.game.name, [Validators.required, Validators.maxLength(100)]],
      minutesForCompletion: [this.game.minutesForCompletion, [Validators.required, Validators.min(1)]],
      supportId: [this.game.supportId, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.loadSupports();
  }

  loadSupports(): void {
    this.supportService.getAllSupports().subscribe(
      (data: Support[]) => {
        this.supports = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching supports:', error);
        this.loading = false;
      }
    );
  }

  resetForm(): void {
    this.createGameForm.reset();
  }

  onSubmit(): void {
    if (this.createGameForm.valid) {
      const formValues = this.createGameForm.value;

      this.videogameService.createGame(formValues).subscribe({
        next: (result) => {
          this.successMessage = 'Game created successfully!';
          this.createdGame.emit(result);

          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        error: (err) => {
          this.errorMessage = 'Failed to create game.';

          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      });
    }
  }
}
