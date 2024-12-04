import { Routes } from '@angular/router';
import {RoleGuard} from './guards/role.guard';
import {NotAuthorizedComponent} from './components/not-authorized/not-authorized.component';
import {UserComponent} from './components/user/user.component';
import {AdminComponent} from './components/admin/admin.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'user'] }
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent
  }
];
