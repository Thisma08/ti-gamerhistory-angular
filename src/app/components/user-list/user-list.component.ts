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

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  onCreatedUser(newUser: User): void {
    this.users = [...this.users, newUser];
  }
}
