import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('./Product/product.routes')
      .then(m => m.default) // Ensure 'ProductRoutes' is properly exported
  },
  {
    path: 'marca',
    loadChildren: () => import('./Marca/marca.routes')
      .then(m => m.default) // Ensure 'ProductRoutes' is properly exported
  },
  {
    path: 'category',
    loadChildren: () => import('./Category/category.routes')
      .then(m => m.default) // Ensure 'ProductRoutes' is properly exported
  },

  {
    path: 'login',
    loadComponent: () => import('./auth/feactures/login/login.component')
      .then(m => m.LoginComponent), // ✅ CORRECTO: loadComponent para standalone components
  },
  { path: 'layout',
    loadChildren: ()=> import ('./shared/feactures/shared.routes').then(m=> m.default)
  },
 {
  path: '',
  loadComponent: () => import('./Landing/landing-page/landing-page.component')
  .then(m => m.LandingPageComponent), // Asegúrate de exportar correctamente el componente
},
  {
    path:'**',
    redirectTo: '',
    pathMatch: 'full'
  },
];
