import { Routes } from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";


export default [
    {
        path: '',
        loadComponent: ()=> import('./pages/layout/layout.component').then(m=>m.LayoutComponent)
    },
    {
        path: '',
        component: LayoutComponent, // 👈 Este es el contenedor con el <router-outlet>
        children: [ // 👈 Rutas hijas que se cargan dentro del layout

          {
            path: 'product',
            loadChildren: () => import('../Product/product.routes')
            .then(m => m.default) // 👈 Carga las rutas del módulo de productos
          },

          {
            path: 'marca',
              loadChildren: () => import('../Marca/marca.routes')
              .then(m => m.default) // 👈 Carga las rutas del módulo de productos
          },
          {
            path: 'category',
              loadChildren: () => import('../Category/category.routes')
              .then(m => m.default) // 👈 Carga las rutas del módulo de productos
          },
          {
            path: 'user',
              loadChildren: () => import('../User/user.routes')
              .then(m => m.default) // 👈 Carga las rutas del módulo de productos
          },
        ]
    }

] as Routes;





