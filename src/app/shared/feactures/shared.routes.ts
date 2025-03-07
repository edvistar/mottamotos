import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";


export default [
    {
        path: '',
        loadComponent: ()=> import('./layout/layout.component').then(m=>m.LayoutComponent)
    },
    {
        path: '',
        component: LayoutComponent, // 👈 Este es el contenedor con el <router-outlet>
        children: [ // 👈 Rutas hijas que se cargan dentro del layout
         
            { 
                path: 'product', 
                loadChildren: () => import('../../Product/features/product.routes')
                  .then(m => m.default) // 👈 Carga las rutas del módulo de productos
            },
        
        
        
        
        
        
        
        ] 
       

    }

] as Routes;





