import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Login } from '../../../interfaces/login';
import { Observable } from 'rxjs';
import { Sesion } from '../../../interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string = environment.apiUrl + 'usuario/';
  constructor( private http: HttpClient, private cookieService: CookieService) { }
  // Método para iniciar sesión
  iniciarSesion(request: Login): Observable<Sesion> {
    return this.http.post<Sesion>(`${this.baseUrl}login`, request);
  }

}
