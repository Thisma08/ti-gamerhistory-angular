import { Routes } from '@angular/router';
import {RoleGuard} from './guards/role.guard';
import {NotAuthorizedComponent} from './components/not-authorized/not-authorized.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {LayoutComponent} from './components/layout/layout.component';
import {VideogameListComponent} from './components/videogame-list/videogame-list.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserCreateComponent} from './components/user-create/user-create.component';
import {VideogameCreateComponent} from './components/videogame-create/videogame-create.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HistoryComponent} from './components/history/history.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'user',
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'user'] },
        children: [
          {
            path: 'videogames',
            children: [
              { path: '', component: VideogameListComponent },
              { path: 'create', component: VideogameCreateComponent },
            ],
          }
        ],
      },
      {
        path: 'admin',
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
        children: [
          {
            path: 'videogames',
            children: [
              { path: '', component: VideogameListComponent },
              { path: 'create', component: VideogameCreateComponent },
            ],
          },
          {
            path: 'users',
            children: [
              { path: '', component: UserListComponent },
              { path: 'create', component: UserCreateComponent },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
