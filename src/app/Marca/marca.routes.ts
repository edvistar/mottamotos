import { Routes } from '@angular/router';
import { authGuard } from '../core/_guards/auth.guard';
import { roleGuard } from '../core/_guards/role.guard';

export default [
  {
    path: 'create',
    loadComponent: () => import('./pages/create/create.component')
      .then(m => m.CreateComponent), // Ensure correct named export
      canActivate: [authGuard, roleGuard]
  },
  {
    path: 'create/:id',
    loadComponent: () => import('./pages/create/create.component')
      .then(m => m.CreateComponent), // Ensure correct named export
      canActivate: [authGuard, roleGuard]
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/list/list.component')
      .then(m => m.ListComponent), // Ensure correct named export
      canActivate: [authGuard,roleGuard]
  },
] as Routes;
