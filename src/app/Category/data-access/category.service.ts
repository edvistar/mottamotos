import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../interfaces/api-response';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string = environment.apiUrl + 'category/'
  constructor(private http: HttpClient) { }

  lista() : Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}`)
  }
  getMarcaById(id: number): Observable<ApiResponse>{
      return this.http.get<ApiResponse>(`${this.baseUrl}${id}`);
    }
    editar(request: Category | FormData): Observable<ApiResponse> {
      return this.http.put<ApiResponse>(`${this.baseUrl}`, request);
    }
    crear(request: Category | FormData): Observable<ApiResponse> {
      return this.http.post<ApiResponse>(`${this.baseUrl}`, request);
    }

    eliminar(id: number): Observable<ApiResponse>{
      return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`)
    }
}
