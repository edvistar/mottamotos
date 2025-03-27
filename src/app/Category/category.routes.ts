import { Routes } from '@angular/router';

export default [
  {
    path: 'list',
    loadComponent: () => import('./pages/list/list.component')
      .then(m => m.ListComponent), // Ensure correct named export
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/create/create.component')
      .then(m => m.CreateComponent), // Ensure correct named export
  },
  {
    path: 'create/:id',
    loadComponent: () => import('./pages/create/create.component')
      .then(m => m.CreateComponent), // Ensure correct named export
  },
] as Routes;
