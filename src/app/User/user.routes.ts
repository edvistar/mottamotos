import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

export default [
  {
    path: 'list-user',
    canActivate:[authGuard],
    loadComponent: () => import('./pages/list-user/list-user.component')
      .then(m => m.ListUserComponent), // Ensure correct named export
  },
  {
    path: 'create-user',
    canActivate:[authGuard],
    loadComponent: () => import('./pages/create-user/create-user.component')
      .then(m => m.CreateUserComponent), // Ensure correct named export
  },
  {
    path: 'update-user/:id',
    canActivate:[authGuard],
    loadComponent: () => import('./pages/update-user/update-user.component')
      .then(m => m.UpdateUserComponent), // Ensure correct named export
  }
] as Routes;
