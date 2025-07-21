// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../usuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://ec2-3-87-48-145.compute-1.amazonaws.com/users';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.apiUrl);
  }

  createUsuario(usuario: Omit<Usuarios, 'id'>): Observable<Usuarios> {
    return this.http.post<Usuarios>(this.apiUrl, usuario);
  }

  updateUsuario(id: number, usuario: Omit<Usuarios, 'id'>): Observable<Usuarios> {
    return this.http.put<Usuarios>(`${this.apiUrl}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
