import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { Rol } from '../../User/interfaces/rol';

export const roleGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const usuario = storageService.obtenerSesion();
  console.log('Sesión obtenida:', storageService.obtenerSesion());


  console.log('Usuario obtenido en roleGuard:', usuario);
  console.log('Ruta solicitada:', state.url);
  console.log('Rol obtenido en roleGuard:', usuario.Rol);

  if (!usuario || !usuario.rol) {
    console.warn('No hay usuario o rol. Redirigiendo al login.');
    router.navigate(['/login']);
    return false;
  }

  const rolUsuario = usuario.rol.toLowerCase();
  const rutaActual = state.url.startsWith('/') ? state.url : '/' + state.url;

  // Definir rutas permitidas por rol
  const rutasCliente = ['/', '/cart/cart', '/product/detail', '/order/orders'];
  const rutasAdmin = ['*']; // Admin puede acceder a todo

  if (rolUsuario === 'admin' || rutasCliente.includes(rutaActual)) {
    console.log('Acceso permitido:', rutaActual);
    return true;
  } else {
    console.warn('Acceso denegado. Redirigiendo a /unauthorized');
    router.navigate(['/unauthorized']);
    return false;
  }
};
