import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

export default [
  {
    path: 'list',
    loadComponent: () => import('./pages/list/list.component')
      .then(m => m.ListComponent), // Ensure correct named export
      canActivate: [authGuard]
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/create/create.component')
      .then(m => m.CreateComponent), // Ensure correct named export
      canActivate: [authGuard]
  },
  {
    path: 'create/:id',
    loadComponent: () => import('./pages/create/create.component')
      .then(m => m.CreateComponent), // Ensure correct named export
      canActivate: [authGuard]
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/detail/detail.component')
      .then(m => m.DetailComponent), // Ensure correct named export
  },
  {
    path: '',
    redirectTo: '/landing', // 🔹 Redirige a la landing si acceden a /products directamente
    pathMatch: 'full'
  },
] as Routes;
