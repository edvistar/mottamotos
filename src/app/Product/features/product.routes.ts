import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./list-product/list-product.component'),
  },

  {
    path: 'product/:id',
    loadChildren: () => import('./detail-product/detail-product.component'),
  }
] as unknown as Routes;
