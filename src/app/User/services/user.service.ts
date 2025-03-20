import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../../interfaces/api-response';
import { Observable, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { Register } from '../interfaces/register-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = environment.apiUrl + 'usuario/';
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  lista(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }

  getUserById(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}${id}`);
  }
  listadoRoles(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}ListadoRoles`)
  }
  editar(request: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}`, request);
  }
  crear(request: Register): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}`, request);
  }

  eliminar(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`);
  }
}
