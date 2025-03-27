import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

export default [
  {
    path: 'list',
    canActivate:[authGuard],
    loadComponent: () => import('./pages/list/list.component')
      .then(m => m.ListComponent), // Ensure correct named export
  },
  {
    path: 'create',
    canActivate:[authGuard],
    loadComponent: () => import('./pages/create/create.component')
      .then(m => m.CreateComponent), // Ensure correct named export
  },
  {
    path: 'update/:id',
    canActivate:[authGuard],
    loadComponent: () => import('./pages/update/update.component')
      .then(m => m.UpdateComponent), // Ensure correct named export
  }
] as Routes;
