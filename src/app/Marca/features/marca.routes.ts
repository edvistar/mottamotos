import { Routes } from '@angular/router';

export default [
  {
    path: 'marca',
    loadComponent: () => import('./marca/marca.component')
      .then(m => m.MarcaComponent), // Ensure correct named export
  },
  {
    path: 'create-marca',
    loadComponent: () => import('./create-marca/create-marca.component')
      .then(m => m.CreateMarcaComponent), // Ensure correct named export
  },
  {
    path: 'create-marca/:id',
    loadComponent: () => import('./create-marca/create-marca.component')
      .then(m => m.CreateMarcaComponent), // Ensure correct named export
  },
  {
    path: 'list-marca',
    loadComponent: () => import('./list-marca/list-marca.component')
      .then(m => m.ListMarcaComponent), // Ensure correct named export
  },
] as Routes;
