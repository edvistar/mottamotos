import { Routes } from '@angular/router';

export default [
  {
    path: 'list-category',
    loadComponent: () => import('./list-category/list-category.component')
      .then(m => m.ListCategoryComponent), // Ensure correct named export
  },
  {
    path: 'create-category',
    loadComponent: () => import('./create-category/create-category.component')
      .then(m => m.CreateCategoryComponent), // Ensure correct named export
  },
  {
    path: 'create-category/:id',
    loadComponent: () => import('./create-category/create-category.component')
      .then(m => m.CreateCategoryComponent), // Ensure correct named export
  },
] as Routes;
