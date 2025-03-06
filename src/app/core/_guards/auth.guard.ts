import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../shared/data-access/storage.service';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {

   const storageService = inject(StorageService);
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const usuario = storageService.obtenerSesion();
  let token = cookieService.get('Authorization');

   // Imprimir el token en consola
   console.log('Token obtenido ahora:', usuario);

  if(token &&usuario){
    token = token.replace('Bearer ','');
      const decodeToken: any = jwt_decode(token);
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
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

