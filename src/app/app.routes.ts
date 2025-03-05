import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./Product/features/product.routes')
      .then(m => m.default) // Ensure 'ProductRoutes' is properly exported
  },
];