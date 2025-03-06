import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./Product/features/product.routes')
      .then(m => m.default) // Ensure 'ProductRoutes' is properly exported
  },

  {
    path: 'login',
    loadComponent: () => import('./auth/feactures/login/login.component')
      .then(m => m.LoginComponent), // ✅ CORRECTO: loadComponent para standalone components
  },
 {
  path: '',
  loadComponent: () => import('./Landing/landing-page/landing-page.component')
  .then(m => m.LandingPageComponent), // Asegúrate de exportar correctamente el componente
},
];
