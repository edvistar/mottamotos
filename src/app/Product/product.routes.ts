import { Routes } from '@angular/router';

export default [
  {
    path: 'list-product',
    loadComponent: () => import('./pages/list-product/list-product.component')
      .then(m => m.ListProductComponent), // Ensure correct named export
  },
  {
    path: 'create-product',
    loadComponent: () => import('./pages/create-product/create-product.component')
      .then(m => m.CreateProductComponent), // Ensure correct named export
  },
  {
    path: 'create-product/:id',
    loadComponent: () => import('./pages/create-product/create-product.component')
      .then(m => m.CreateProductComponent), // Ensure correct named export
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/detail-product/detail-product.component')
      .then(m => m.DetailProductComponent), // Ensure correct named export
  }
] as Routes;
