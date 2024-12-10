import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  role: string | null = null;
  loading = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.loading = true

    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      (response) => {
        console.log(response);
        const token = response.token;
        if (token) {
          this.authService.setToken(token);
          console.log('Retrieved token:', this.authService.getToken());
          this.role = this.authService.getRole();
        }
        this.loading = false;
        this.router.navigate(['/history'])
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Invalid username or password.';
        console.error('Login failed:', error);
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    );
  }
}
