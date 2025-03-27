import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

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
  path: 'user',
  loadChildren: () => import('./User/user.routes')
    .then(m => m.default), // ✅ CORRECTO: loadComponent para standalone components
 },
  { path: 'layout',
    loadChildren: ()=> import ('./shared/shared.routes').then(m=> m.default)
  },
{
  path: 'cart',
  loadComponent: () => import('./Cart/cart/cart.component')
  .then(m => m.CartComponent), // Asegúrate de exportar correctamente el componente
},
{
  path: 'login',
  loadComponent: () => import('./auth/pages/login/login.component')
    .then(m => m.LoginComponent), // ✅ CORRECTO: loadComponent para standalone components
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
