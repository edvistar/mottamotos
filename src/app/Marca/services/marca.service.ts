import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../interfaces/api-response';
import { Observable } from 'rxjs';
import { Marca } from '../interfaces/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  baseUrl: string = environment.apiUrl + 'marca/'
  constructor(private http: HttpClient) { }

  lista() : Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}`)
  }
  getMarcaById(id: number): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}${id}`);
  }
  // editar(request: Marca): Observable<ApiResponse>;
  // editar(request: FormData): Observable<ApiResponse>;
  editar(request: Marca | FormData): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}`, request);
  }
  crear(request: Marca): Observable<ApiResponse>;
  crear(request: FormData): Observable<ApiResponse>;
  crear(request: Marca | FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}`, request);
  }

  eliminar(id: number): Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`)
  }
}
