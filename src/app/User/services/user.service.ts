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
    // const token = this.cookieService.get('Authorization');
    // if (!token) {
    //   return throwError(() => new Error('Unauthorized: No token found'));
    // }
    // const headers = new HttpHeaders().set('Authorization', token);

    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}${id}`);
  }
  editar(request: User): Observable<ApiResponse> {
    // const token = this.cookieService.get('Authorization');
    // if (!token) {
    //   return throwError(() => new Error('Unauthorized: No token found'));
    // }
    // const headers = new HttpHeaders().set('Authorization', token);

    return this.http.put<ApiResponse>(`${this.baseUrl}`, request);
  }
  crear(request: Register): Observable<ApiResponse> {
    // const token = this.cookieService.get('Authorization');
    // if (!token) {
    //   return throwError(() => new Error('Unauthorized: No token found'));
    // }
    // const headers = new HttpHeaders().set('Authorization', token);

    return this.http.post<ApiResponse>(`${this.baseUrl}`, request);
  }

  eliminar(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`);
  }
}
