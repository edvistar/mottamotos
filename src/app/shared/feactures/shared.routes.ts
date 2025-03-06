import { Routes } from "@angular/router";

export default [
    {
        path: '',
        loadComponent: ()=> import('./layout/layout.component').then(m=>m.LayoutComponent)
    }

] as Routes;
