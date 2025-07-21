import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../category';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://ec2-3-87-48-145.compute-1.amazonaws.com/categorias').pipe(
      catchError((error) => {
        console.error('Error al obtener categorías:', error);
        return of([]); // Retorna un arreglo vacío en caso de error
      })
    );
  }
}
