import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./list-product/list-product.component')
      .then(m => m.ListProductComponent), // Ensure correct named export
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./detail-product/detail-product.component')
      .then(m => m.DetailProductComponent), // Ensure correct named export
  }
] as Routes;
