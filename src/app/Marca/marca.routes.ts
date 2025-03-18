import { Routes } from '@angular/router';

export default [
  {
    path: 'create-marca',
    loadComponent: () => import('./pages/create-marca/create-marca.component')
      .then(m => m.CreateMarcaComponent), // Ensure correct named export
  },
  {
    path: 'create-marca/:id',
    loadComponent: () => import('./pages/create-marca/create-marca.component')
      .then(m => m.CreateMarcaComponent), // Ensure correct named export
  },
  {
    path: 'list-marca',
    loadComponent: () => import('./pages/list-marca/list-marca.component')
      .then(m => m.ListMarcaComponent), // Ensure correct named export
  },
] as Routes;
