import {Component, OnInit} from '@angular/core';
import {User} from '../../classes/user';
import {UserService} from '../../services/user.service';
import {NgClass} from '@angular/common';
import {UserCreateComponent} from '../user-create/user-create.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgClass,
    UserCreateComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = true;

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
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

  onCreatedUser(newUser: User): void {
    this.users = [...this.users, newUser];
  }
}
