import { Routes } from '@angular/router';

export default [
  {
    path: 'list-product',
    loadComponent: () => import('./list-product/list-product.component')
      .then(m => m.ListProductComponent), // Ensure correct named export
  },
  {
    path: 'create-product',
    loadComponent: () => import('./create-product/create-product.component')
      .then(m => m.CreateProductComponent), // Ensure correct named export
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./detail-product/detail-product.component')
      .then(m => m.DetailProductComponent), // Ensure correct named export
  }
] as Routes;
