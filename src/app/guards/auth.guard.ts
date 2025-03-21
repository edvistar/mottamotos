import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode'; // ✅ Correcto

export const authGuard: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService);
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const usuario = storageService.obtenerSesion();
  let token = cookieService.get('Authorization');

   // Imprimir el token en consola
   console.log('Token obtenido ahora:', usuario);

  if(token && usuario){
    token = token.replace('Bearer ','');
      const decodeToken: any = jwtDecode(token);
      const fechaExpiracion = decodeToken.exp * 1000;
      const fechaActual = new Date().getTime();
      if(fechaExpiracion < fechaActual){
        router.navigate(['login']);
        return false;
      }
    return true
  }
  else{
    router.navigate(['login']);
  return false;
  }
};

