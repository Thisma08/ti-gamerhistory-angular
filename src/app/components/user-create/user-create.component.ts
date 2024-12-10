import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {User} from '../../classes/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  createUserForm: FormGroup;

  @Output() createdUser = new EventEmitter<User>();

  user: User = {
    pseudo: '',
    email: '',
    password: '',
    role: ''
  }

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.createUserForm= this.fb.group({
      pseudo: [this.user.pseudo, [Validators.required, Validators.maxLength(100)]],
      email: [this.user.email, [Validators.required, Validators.maxLength(150)]],
      password: [this.user.password, [Validators.required, Validators.maxLength(150)]],
      role: [this.user.role, [Validators.required, Validators.maxLength(5)]]
    })
  }

  resetForm(): void {
    this.createUserForm.reset();
  }

  onSubmit(): void {
    if (this.createUserForm.valid) {
      const formValues = this.createUserForm.value;

      this.userService.createUser(formValues).subscribe({
        next: (result) => {
          this.successMessage = 'User created successfully!';
          this.createdUser.emit(result);

          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        error: (err) => {
          this.errorMessage = 'Failed to create user.';

          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      });
    }
  }
}
