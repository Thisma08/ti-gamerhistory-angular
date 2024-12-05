import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  userRole: string | null = null;
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
    this.username = this.authService.getUsername();
    console.log('User role in LayoutComponent:', this.userRole);
    console.log('Username in LayoutComponent:', this.username);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log(response.message);
        localStorage.removeItem('jwt_token');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      },
    });
  }
}
